class PagesController < ApplicationController
	def index
		render json: Page.all
	end

	def show
		render json: Page.find(params[:id])
	end
end
