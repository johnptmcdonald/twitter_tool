require 'rails_helper'

RSpec.describe UsersController, :type => :controller do

	it "should use UsersController" do
	   controller.should be_an_instance_of(UsersController)
	end


	describe "GET stop" do

	    it "should be defined in the controller" do
	      	get :stop
	      	expect(response).to be_success
	    end

	    it "should create a (killer) tweet in the database" do
	        expect do
	        	get :stop
	        end.to change(Tweet, :count).by(1)
	    end

  	end

		describe "GET index" do

    it "should be defined in the controller" do
      	get :index
      	expect(response).to be_success
    end


  	end



end





