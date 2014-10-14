Rails.application.routes.draw do
  root 'users#index'

  get 'users/poster', to: 'users#poster', as: 'poster'
  get 'users/hasher', to: 'users#hasher', as: 'hasher'
  post 'users/reply_to', to: 'users#reply_to', as: 'reply'
  get 'users/retweet', to: 'users#retweet', as: 'retweet'
  get 'users/unretweet', to: 'users#unretweet', as: 'unretweet'
  get 'users/favorite', to: 'users#favorite', as: 'favorite'
  get 'users/unfavorite', to: 'users#unfavorite', as: 'unfavorite'
  get 'users/follow', to: 'users#follow', as: 'follow'
  get 'users/unfollow', to: 'users#unfollow', as: 'unfollow'
  get 'stop', to: 'users#stop', as: 'stop'

  # Data Paths
  get 'us', to: 'data#us', as: 'us'
  #tweet data
  get 'tweetdata', to: 'data#tweet_data', as: 'tweetdata'
  get 'geographytweets', to: 'data#geography_tweets', as: 'geographytweets'

  get 'auth/:provider/callback', to: 'sessions#create'
  #get 'auth/failure', to: redirect('/') #eventually when we know for sure we are all set up developing
  get 'signout', to: 'sessions#destroy', as: 'signout'


  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
