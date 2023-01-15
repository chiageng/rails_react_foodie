Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'forums/index'
      post 'forums/create'
      get 'forums/show/:id', to: "forums#show"
      delete 'forums/destroy/:id', to: "forums#destroy"
      post 'forums/update/:id', to: "forums#update"
      get 'forum/update/:id', to: "forums#edit"
      post 'forums/:forum_id/comments/create', to: "comments#create"
      delete 'forums/:forum_id/comments/:id', to: "comments#destroy"

      post 'users/create', to: 'users#create'
      get 'users/index', to: 'users#index'
      get 'users/show/:id', to: "users#show"
      delete 'users/destroy/:id', to: "users#destroy"
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
