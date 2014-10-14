class User < ActiveRecord::Base
  def self.from_omniauth(auth)
    # Check if user exists already, if not create one
    where(auth.slice('provider', 'uid', 'oauth_token', 'oauth_token_secret')).first || create_from_omniauth(auth)
  end

  def self.create_from_omniauth(auth)
    create! do |user|
      user.provider = auth['provider']
      user.uid = auth['uid']
      user.name = auth['info']['nickname']
      user.token = auth['credentials']['token']
      user.token_secret = auth['credentials']['secret']
    end
  end
end
