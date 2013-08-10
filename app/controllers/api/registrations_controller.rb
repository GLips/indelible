class Api::RegistrationsController < Devise::RegistrationsController
	include Flashes
	respond_to :json

	# POST /resource
	def create
		build_resource(sign_up_params)

		if resource.save
			if resource.active_for_authentication?
				set_flash_message :notice, :signed_up if is_navigational_format?
				sign_up(resource_name, resource)
				render json: { resource: resource }
			else
				set_flash_message :notice, :"signed_up_but_#{resource.inactive_message}" if is_navigational_format?
				expire_session_data_after_sign_in!
				render json: { resource: resource }
			end
		else
			clean_up_passwords resource
			resource.errors.full_messages.each do |m|
				add_error m
			end
			render json: {}
		end
	end
end