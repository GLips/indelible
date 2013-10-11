# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :paragraph do
		sequence(:content) {|n| "Paragraph ##{n}!" }
		sequence(:order) {|n| n }
    page
  end
end
