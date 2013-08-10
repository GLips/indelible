Indelibile::Application.routes.draw do

	devise_for :users, path_prefix: 'api', controllers: { sessions: 'api/sessions', registrations: 'api/registrations' }

	scope :api do
		resources :pages, controller: 'api/pages'
	end

	root to: 'home#index'
end
