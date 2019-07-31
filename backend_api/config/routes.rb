Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :games, only: [:create, :index]
      resources :users, only: [:create, :index]
      resources :categories, only: [:index]
      resources :arts, only: [:index, :create]
    end
  end

end
