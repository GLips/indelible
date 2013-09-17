Indelibile::Application.routes.draw do

	devise_for :users, path_prefix: 'api', controllers: { sessions: 'api/sessions', registrations: 'api/registrations' }

	scope :api do
		resources :pages, controller: 'api/pages'
		resource :subscriptions, controller: 'api/subscriptions'
	end

	get '*pages' => 'home#index'
	get '*users' => 'home#index'

	root to: 'home#index'
end