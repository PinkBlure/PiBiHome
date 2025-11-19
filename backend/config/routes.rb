Rails.application.routes.draw do
  resources :tasks, except: [:new, :edit]
  resources :incomes, except: [:new, :edit]
  resources :expenses, except: [:new, :edit]
  resources :income_sources, except: [:new, :edit]
  resources :category_types, except: [:new, :edit]
  resources :categories, except: [:new, :edit]

  get 'dashboard/summary', to: 'dashboard#summary'
end