class Page < ActiveRecord::Base
	belongs_to :user
	has_many :paragraphs, inverse_of: :page
	accepts_nested_attributes_for :paragraphs

	validates :user_id, presence: true

	default_scope { order('created_at DESC') }
end