Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  resources :pricings, only: [:index, :show] 
  resources :procedure_codes, only: [:index, :show]
  resources :common_procedure_codes, only: [:index, :show]
  resources :hospitals, only: [:index, :show]

  get '/procedure_codes/by_code/:code', to: 'procedure_codes#show_by_code'
  get '/common_procedure_codes/by_code/:code', to: 'common_procedure_codes#show_by_code'

  get '/procedure_codes/:id/cost', to: 'procedure_codes#show_with_cost'
  get '/procedure_codes/:id/cost/hospitals/:hospital_id', to: 'procedure_codes#show_with_cost_at_hospital'

  get '/procedure_codes/by_code/:code/cost', to: 'procedure_codes#show_with_cost_by_code'
  get '/procedure_codes/by_code/:code/cost/hospitals/:hospital_id', to: 'procedure_codes#show_with_cost_by_code_at_hospital'

end
