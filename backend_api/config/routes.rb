Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :games, only: [:create, :index]
      resources :users, only: [:create, :index]
      resources :categories, only: [:index]
      resources :arts, only: [:index, :create]
    end
  end

end
