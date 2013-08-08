require 'spec_helper'

describe User do
	let!(:user) { FactoryGirl.create(:user) }
	let(:page) { FactoryGirl.create(:page, user: user) }

	subject { user }

	it { should respond_to :pages }
	it 'should have access to pages it owns' do
		subject.pages.should == [page]
	end
end
