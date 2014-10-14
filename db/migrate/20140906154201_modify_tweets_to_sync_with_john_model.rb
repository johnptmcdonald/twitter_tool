class ModifyTweetsToSyncWithJohnModel < ActiveRecord::Migration
  def change
    add_column :tweets, :retweet_count, :integer
    add_column :tweets, :lang, :string
    add_column :tweets, :user_friends_count, :integer
    add_column :tweets, :user_followers_count, :integer
    add_column :tweets, :user_statuses_count, :integer
    add_column :tweets, :user_name, :string
    add_column :tweets, :user_screen_name, :string
    add_column :tweets, :tweet_id_str, :string
  end
end
