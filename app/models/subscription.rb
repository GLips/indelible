class Subscription < ActiveRecord::Base
	belongs_to :user

	def self.parse_stripe_subscription(stripe)
		ret = {}
		ret[:current_period_start] = Time.at(stripe.current_period_start)
		ret[:current_period_end] = Time.at(stripe.current_period_end)
		ret
	end
end
