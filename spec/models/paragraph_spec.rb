require 'spec_helper'

describe Paragraph do
	let!(:user) { FactoryGirl.create(:user) }
	let(:page) { FactoryGirl.create(:page, user: user) }
	let(:paragraph) { FactoryGirl.create(:paragraph, page: page) }

	subject { paragraph }

	it { should respond_to :page }
	its(:page) { should be page }

	describe 'when lacking content' do
		before { paragraph.content = '' }
		it { should_not be_valid }
	end

	describe 'when lacking an order' do
		before { paragraph.order = '' }
		it { should_not be_valid }
	end
end