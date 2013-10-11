require 'spec_helper'

describe Page do
	let!(:user) { FactoryGirl.create(:user) }
	let(:page) { FactoryGirl.create(:page, user: user) }

	subject { page }

	it { should respond_to :user }
	its(:user)   { should be user }


	describe 'when not associated with a user' do
		before { page.user_id = nil }
		it { should_not be_valid }
	end
end
