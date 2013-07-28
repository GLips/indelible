Indelibile::Application.routes.draw do
	scope :api do
		resources :pages
	end

	root to: 'home#index'
end
