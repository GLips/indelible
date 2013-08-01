class Api::SessionsController < Devise::SessionsController
	respond_to :json

	# GET /resource/sign_in
	def new
		self.resource = resource_class.new(sign_in_params)
		clean_up_passwords(resource)
		render json: { flashes: { errors: ['Invalid password or username, check your credentials and try again.'] } }
	end

	# POST /resource/sign_in
	def create
		self.resource = warden.authenticate!(auth_options)
		set_flash_message(:notice, :signed_in) if is_navigational_format?
		sign_in(resource_name, resource)
		render json: resource
	end


	def destroy
		sign_out
		cookies.delete(:_indelible_session)
		reset_session
		render json: { logged_out: true }
	end
end