class SessionsController < ApplicationController
  def create
    # env['omniauth.auth] returns twitter details
    user = User.from_omniauth(env['omniauth.auth'])
    session[:user_id] = user.id

    #raise env['omniauth.auth'].to_yaml
    #raise env['omniauth.auth']['credentials'].to_yaml
    redirect_to root_url, notice: "Signed In"
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_url, notice: "Signed Out"
  end
end