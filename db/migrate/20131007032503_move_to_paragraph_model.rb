class MoveToParagraphModel < ActiveRecord::Migration
	class Page < ActiveRecord::Base
		has_many :paragraphs
	end

	class Paragraph < ActiveRecord::Base
		has_one :page
	end

	def change
		reversible do |dir|
			dir.up do
				Page.all.each do |page|
					if page.content.is_a? String
						paragraphs = page.content.split(/(?:<br>)+/)
						paragraphs.each_with_index do |para, idx|
							if para.is_a? String
								puts "#{para} at index #{idx}"
								page.paragraphs.create({ order: idx + 1, content: para })
							end
						end
					end
				end
			end
		end
	end
end
