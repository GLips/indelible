require 'spec_helper'

describe Page do
	let!(:user) { FactoryGirl.create(:user) }
	let(:page) { FactoryGirl.create(:page, user: user) }

	subject { page }

	it { should respond_to :user }
	its(:user)   { should == user }
end
