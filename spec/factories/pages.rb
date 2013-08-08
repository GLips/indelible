# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :page do
		content	'Test content for a page written in Indelible.'
		user
  end
end