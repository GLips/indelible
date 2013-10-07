class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

	has_many :pages
	has_one :subscription

	def page_summaries
		pages.select('pages.id, pages.is_public, pages.user_id, pages.created_at, pages.updated_at, paragraphs.content as content').joins(:paragraphs).where(paragraphs: {order: 1})
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
