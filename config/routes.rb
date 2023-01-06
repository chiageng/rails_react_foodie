Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'forums/index'
      post 'forums/create'
      get 'forums/show/:id', to: "forums#show"
      delete 'forums/destroy/:id', to: "forums#destroy"
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
