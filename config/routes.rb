Rails.application.routes.draw do
  resources :blocks do
    member do
      get :referenced_blocks
    end
  end

  root 'welcome#index'
  get :prototype, to: 'welcome#prototype', as: :prototype
end
