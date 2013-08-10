require 'spec_helper'

describe Page do
	let!(:user) { FactoryGirl.create(:user) }
	let(:page) { FactoryGirl.create(:page, user: user) }

	subject { page }

	it { should respond_to :user }
	its(:user)   { should == user }


	describe 'when content is less than 20 characters' do
		before { page.content = 'x'*19 }
		it { should_not be_valid }
	end
end
