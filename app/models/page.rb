class Page < ActiveRecord::Base
	belongs_to :user

	validates :content, presence: true, length: { minimum: 20 }
	validates :user_id, presence: true
end
