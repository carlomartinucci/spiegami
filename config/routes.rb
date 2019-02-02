Rails.application.routes.draw do
  resources :blocks do
    member do
      get :referenced_blocks
    end
    collection do
      post :create_block_tree
    end
  end

  root 'welcome#index'
  get :prototype, to: 'welcome#prototype', as: :prototype
  get :write, to: 'welcome#write', as: :write
end
