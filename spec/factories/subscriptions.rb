# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :subscription do
    user_id 1
    current_period_end "2013-09-15 19:56:37"
    current_period_start "2013-09-15 19:56:37"
    active false
  end
end
