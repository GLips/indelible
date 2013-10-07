class Paragraph < ActiveRecord::Base
	belongs_to :page, inverse_of: :paragraphs

	validates :order, presence: true
	validates :content, length: { minimum: 1 }
	validates_presence_of :page
end