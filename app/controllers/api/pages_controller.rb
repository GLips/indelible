class Api::PagesController < ApplicationController
	include Flashes

	before_filter :authenticate_user!, only: [:index, :create, :edit, :update, :destroy]
	before_action :set_page, only: [:show, :edit, :update, :destroy]

	def index
		render json: { pages: current_user.pages }
	end

	def create
		@page = current_user.pages.create(page_params)
		if @page.save
			add_success 'Page stored.'
			render json: { page: @page }
		else
			@page.errors.full_messages.each do |m|
				add_error m
			end
			render json: { page: @page }
		end
	end

	def show
		render json: { page: Page.find(params[:id]) }
	end

	private
	# Use callbacks to share common setup or constraints between actions.
	def set_page
		@page = Page.find(params[:id])
	end

	# Never trust parameters from the scary internet, only allow the white list through.
	def page_params
		params.require(:page).permit(:content, :title)
	end
end
