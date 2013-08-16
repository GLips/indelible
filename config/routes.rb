Indelibile::Application.routes.draw do

	devise_for :users, path_prefix: 'api', controllers: { sessions: 'api/sessions', registrations: 'api/registrations' }

	scope :api do
		resources :pages, controller: 'api/pages'
	end

	#get 'page/*a' => 'home#index'
	get '*pages' => 'home#index'

	root to: 'home#index'
end
