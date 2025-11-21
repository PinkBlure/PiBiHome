Rails.application.routes.draw do
  resources :incomes
  resources :expenses
  resources :income_sources
  resources :category_types
  resources :categories

  get 'dashboard/summary', to: 'dashboard#summary'
end