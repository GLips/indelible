class Api::SessionsController < Devise::SessionsController
	respond_to :json

	# GET /resource/sign_in
	def new
		self.resource = resource_class.new(sign_in_params)
		clean_up_passwords(resource)
		render json: { errors: ['Invalid password or username, check your credentials and try again.'] }
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
		#redirect_path = after_sign_out_path_for(resource_name)
		#signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
		#set_flash_message :notice, :signed_out if signed_out && is_navigational_format?
		# We actually need to hardcode this as Rails default responder doesn't
		# support returning empty response on GET request
		respond_to do |format|

			format.all { head :no_content }
			format.any(*navigational_formats) { render json: { logged_out: true } }
			#render.any(*navigational_formats) {  }
			#format.any(*navigational_formats) { redirect_to redirect_path }
		end
	end
end