Indelibile::Application.routes.draw do
  devise_for :users
	scope :api do
		resources :pages
	end

	root to: 'home#index'
end
