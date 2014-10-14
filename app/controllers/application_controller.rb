class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  private
  def current_user
    @current_user = User.find(session[:user_id]) if session[:user_id]
  end

  def twitter_config(user)
    client = Twitter::REST::Client.new { |config|
      config.consumer_key        = ENV['TWITTER_API_KEY']
      config.consumer_secret     = ENV['TWITTER_API_SECRET']
      config.access_token        = user.token
      config.access_token_secret = user.token_secret
    } if user
  end

  helper_method :current_user, :twitter_config
end
