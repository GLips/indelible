class Api::PagesController < ApplicationController
	include Flashes

	before_filter :authenticate_user!, only: [:index, :create, :edit, :update, :destroy]
	before_action :set_page, only: [:show, :edit, :update, :destroy]
	before_filter :user_owns_page, only: [:show, :update]

	def index
		render json: { pages: current_user.page_summaries }
	end

	def show
			render json: { page: Page.find(params[:id]) }
	end

	def create
		@page = current_user.pages.create(page_params)
		if @page.save
			render json: { saved_page: @page.id }
		else
			@page.errors.full_messages.each do |m|
				add_error m
			end
			render json: { page: @page }
		end
	end

	def update
		if @page.update_attributes(page_params)
			#add_success 'Page stored.'
			render json: { saved_page: @page.id }
		else
			@page.errors.full_messages.each do |m|
				add_error m
			end
			render json: { page: @page }
		end
	end

	private
	def user_owns_page
		if @page.user_id == current_user.id
			true
		else
			add_error 'You don\'t own that page.'
			render json: {}
			false
		end
	end

	# Use callbacks to share common setup or constraints between actions.
	def set_page
		@page = Page.find(params[:id])
	end

	# Never trust parameters from the scary internet, only allow the white list through.
	def page_params
		params.require(:page).permit(:content, :title)
	end
end
