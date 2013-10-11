class Paragraph < ActiveRecord::Base
	belongs_to :page, inverse_of: :paragraphs

	default_scope { order('`order` ASC') }

	validates :order, presence: true
	validates :content, length: { minimum: 1 }
	validates_presence_of :page
end