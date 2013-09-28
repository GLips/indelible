class Api::SubscriptionsController < ApplicationController
	include Flashes

	before_filter :authenticate_user!, only: [:new, :create, :view, :destroy]
	before_action :set_token, only: [:create]
	before_action :set_subscription, only: [:show]

	def new
		render json: { subscription: @subscription }
	end

	def show
		render json: { subscription: @subscription }
	end

	def create
		require 'stripe'
		if current_user.stripe_id
			begin
				update = {
						plan: 'indelible'
				}
				if(current_user.trial_end_date.to_i > Time.zone.now.to_i)
					update[:trial_end] = current_user.trial_end_date.to_i
				end
				customer = Stripe::Customer.retrieve(current_user.stripe_id)
				customer.update_subscription(update)
				s = init_subscription(customer.subscription)
				current_user.subscription.update(s)
				add_success('You are now a happily subscribed Indelible user. Congratulations!')
			rescue Exception => e
				logger.error e.message
				add_error('Something went wrong processing your subscription. If you continue to have issues, contact graham@indelibleapp.com')
			end
		else
			update = {
					card: @token,
					plan: 'indelible',
					email: current_user.email
			}
			if(current_user.trial_end_date.to_i > Time.zone.now.to_i)
				update[:trial_end] = current_user.trial_end_date.to_i
			end
			customer = Stripe::Customer.create(update)
			current_user.stripe_id = customer.id
			s = init_subscription(customer.subscription)
			current_user.create_subscription(s)
			current_user.save
			add_success('You are now a happily subscribed Indelible user. Congratulations!')
		end

		render json: { subscription: current_user.subscription }
	end

	def destroy
		require 'stripe'
		begin
			customer = Stripe::Customer.retrieve(current_user.stripe_id)
			customer.cancel_subscription
			current_user.cancel_subscription
			add_success 'You have been unsubscribed successfully.'
			render json: { subscription: current_user.subscription }
		rescue Exception => e
			logger.error e.message
			add_error('Something went wrong processing your subscription. Try again, or if you continue to have issues, contact graham@indelibleapp.com')
			render json: {}
		end
	end

	private
	def set_token
		@token = params[:stripeToken]
	end

	def set_subscription
		require 'stripe'
		@subscription = current_user.subscription
	end

	def init_subscription(stripe_subscription)
		s = Subscription.parse_stripe_subscription(stripe_subscription)
		s[:active] = 1
		s
	end
end
