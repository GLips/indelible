class Api::SessionsController < Devise::SessionsController
	include Flashes
	respond_to :json

	# GET /resource/sign_in
	def new
		self.resource = resource_class.new(sign_in_params)
		clean_up_passwords(resource)
		add_error 'Invalid password or email, check your credentials and try again.'
		render json: {}
	end

	# POST /resource/sign_in
	def create
		self.resource = warden.authenticate!(auth_options)
		set_flash_message(:notice, :signed_in) if is_navigational_format?
		sign_in(resource_name, resource)
		add_success find_message(:signed_in)
		render json: { resource: resource }
	end


	def destroy
		sign_out
		cookies.delete(:_indelible_session)
		reset_session
		add_success find_message(:signed_out)
		render json: { logged_out: true }
	end
end