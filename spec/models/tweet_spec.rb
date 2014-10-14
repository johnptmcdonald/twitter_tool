require 'rails_helper'

RSpec.describe Tweet, :type => :model do
  it { should respond_to "text" }
  it { should respond_to "stop_feed" }
  it { should respond_to "coordinates" }
  it { should respond_to "retweet_count" }
  it { should respond_to "lang" }
  it { should respond_to "user_friends_count" }
  it { should respond_to "user_followers_count" }
  it { should respond_to "user_statuses_count" }
  it { should respond_to "user_name" }
  it { should respond_to "user_screen_name" }
  it { should respond_to "tweet_id_str" }

end
