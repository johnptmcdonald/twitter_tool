require 'rails_helper'

RSpec.describe DataController, :type => :controller do

	describe "GET tweet_data" do

	    it "should exist" do
	      get :tweet_data
	      expect(response).to be_success
	    end

	    it "should be prepared to display json data" do
	      get :tweet_data
	      response.header['Content-Type'].should include 'json'
	    end

	    it "should should display tweets" do
	      tweet = Tweet.create(text: "@OMG besties 4EVA!")
	      get :tweet_data
	      response.body.should include "@OMG besties 4EVA!"

	    end
  	end

  	describe "US action" do

	    it "should exist" do
	      get :us
	      expect(response).to be_success
	    end

	    it "should be prepared to display json data" do
	      get :us
	      response.header['Content-Type'].should include 'json'
	    end

	    it "should should display tweets" do
	      tweet = Tweet.create(text: "@OMG besties 4EVA!")
	      get :tweet_data
	      response.body.should include "@OMG besties 4EVA!"

	    end
  	end

end
