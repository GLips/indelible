Indelibile::Application.routes.draw do

	devise_for :users, path_prefix: 'api'

	scope :api do
		resources :pages
	end

	root to: 'home#index'
end
