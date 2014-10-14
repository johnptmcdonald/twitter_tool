include ApplicationHelper
class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy, :index, :poster, :hasher,
    :favorite, :unfavorite, :reply_to, :retweet, :unretweet, :follow, :unfollow]

    # todo: If we are going to be repeating twitter_config, we should make it a 
    # before method and delegate to specific actions
    # twitter_config global helper establishes OAuth connection

  # GET /users
  # GET /users.json
  def index
    @users = User.all
    #@token = @current.token
    #@secret = @current.token_secret
  end

  # todo: clean up hasher method by extracting to model
  def hasher
    # capture hash parameter from form_tag
    @search_term = params[:search_term]
    # @search_term[0] = ''
    # Open stream with searchable term
    #todo: Reopen stream
    open_stream(@search_term)

    # todo: Implement Frequency Bubbles
    $frequencyHash = {}

    # twitter_config global helper establishes OAuth connection
    client = twitter_config(@current)
    hashtag = "#" + @search_term
    @tweets = client.search(hashtag).take(250)
    @tweets.each do |t|
      frequencyOfValVars(t.attrs[:text])
    end
    @cleanHash = $frequencyHash.sort_by {|k, v| v}.reverse

    # Get the top 50 tweets based on follower count
    topFollowedTweets = @tweets.sort_by {|t| t.attrs[:user][:followers_count]}.reverse[0..50]
    # Removes duplicates based on name and extract only 9
    @topFollowed = topFollowedTweets.uniq {|t| t.attrs[:user][:screen_name] }[0..8]
    #friends = my_friends    #(@top9) eventually you'll pass in top9 to identify if following those users

    # topFavorited Tweets
    # topFavoritedTweets = @tweets.sort_by {|t| t.attrs[:favorite_count]}.reverse[0..50]
    # @topFavorited = topFavoritedTweets.uniq{|t| t.attrs[:user][:screen_name] }[0..8]

  end

  def favorite
    client = twitter_config(@current)
    client.favorite!(params[:tweet_id])
  end

  def unfavorite
    client = twitter_config(@current)
    client.unfavorite(params[:tweet_id])
  end

  def reply_to
    client = twitter_config(@current)
    client.update(params[:reply_text], in_reply_to_status_id: params[:reply_to_id])
    redirect_to '', notice: "Reply Worked"
  end

  def retweet
    client = twitter_config(@current)
    client.retweet!(params[:tweet_id])
  end

  def unretweet

  end

  def follow
    client = twitter_config(@current)
    client.follow!(params[:screen_name])
  end

  def unfollow
    client = twitter_config(@current)
    client.unfollow(params[:screen_name])
  end

  def stop
    # This inserts the killer tweet that stops the rake task
    Tweet.create(text: "You have stopped the live stream", stop_feed: "yes")
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @current = current_user
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params[:user]
    end

    def open_stream(search_term)

      # Kill all tweets so we can start with a fresh stream into postgreSQL:
      Tweet.destroy_all
      @tweets = Tweet.all

      # This is the command that starts the rake task save_tweets in lib/tasks/save_tweets
      system "rake save_tweets SEARCH_TERM=#{search_term} USER_ID=#{session[:user_id]} &"
    end
end
