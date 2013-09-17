class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

	has_many :pages
	has_one :subscription

	def page_summaries
		pages.select('id, LEFT(content, 150) AS content, is_public, user_id, created_at, updated_at')
	end

	def cancel_subscription
		subscription.update(active: 0)
	end

	def trial_days_left
		end_date = trial_end_date.to_i / 1.day
		today = Time.zone.now.to_i / 1.day
		[end_date - today, 0].max
	end

	def trial_end_date
		created_at + 30.days
	end
end
