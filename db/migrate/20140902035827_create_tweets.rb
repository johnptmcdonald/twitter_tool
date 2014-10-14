class CreateTweets < ActiveRecord::Migration
  def change
    create_table :tweets do |t|
      t.string   "text"
      t.datetime "created_at"
      t.datetime "updated_at"
      t.string   "stop_feed"
      t.json     "coordinates"
    end
  end
end
