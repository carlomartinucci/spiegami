Rails.application.routes.draw do
  resources :blocks

  root 'blocks#index'
end
