desc "Save tweets"

task :save_tweets => :environment do
    

  

  user = User.find(ENV['USER_ID'])

  TweetStream.configure do |config|
      config.consumer_key       = ENV['TWITTER_API_KEY']
      config.consumer_secret    = ENV['TWITTER_API_SECRET']
      config.oauth_token        = user.token
      config.oauth_token_secret = user.token_secret
      config.auth_method        = :oauth
    end

  # This will pull a sample of all tweets based on
  # your Twitter account's Streaming API role.
  TweetStream::Client.new.track(ENV["SEARCH_TERM"]) do |status|
  
  # The status object is a special Hash with
  # method access to its keys. The Streaming API examples used this syntax. 

    # This just puts the tweet text into iTerm
    puts status.attrs[:text]
    

    puts status.attrs[:coordinates]
    # This just posts the tweet coordinates into iTerm

    # This is the database methose of aborting a rake. When you click stop, it inserts
    # a tweet with stop_feed = yes. This stops the rake task. 
    if !status.attrs[:retweeted_status].nil?
      Tweet.create!(text: status.text, 
                    coordinates: status.attrs[:coordinates], 
                    tweet_id_str: status.attrs[:id_str],
                    
                    lang: status.attrs[:lang],
                    
                    retweet_count: status.attrs[:retweeted_status][:retweet_count],

                    user_name: status.attrs[:user][:name],
                    user_screen_name: status.attrs[:user][:screen_name],
                    user_friends_count: status.attrs[:user][:friends_count],
                    user_followers_count: status.attrs[:user][:followers_count],
                    user_statuses_count: status.attrs[:user][:statuses_count]
                    ) 
    else 
      Tweet.create!(text: status.text, 
                    coordinates: status.attrs[:coordinates], 
                    tweet_id_str: status.attrs[:id_str],
                    
                    lang: status.attrs[:lang],
                    
                    # retweet_count: status.attrs[:retweeted_status][:retweet_count],

                    user_name: status.attrs[:user][:name],
                    user_screen_name: status.attrs[:user][:screen_name],
                    user_friends_count: status.attrs[:user][:friends_count],
                    user_followers_count: status.attrs[:user][:followers_count],
                    user_statuses_count: status.attrs[:user][:statuses_count]
                    ) 
    end
    if !Tweet.where(stop_feed: "yes").empty?
      abort
    end
  end


end