class DataController < ApplicationController
  before_action :set_datum, only: [:show, :edit, :update, :destroy]
  before_action :read_us, only: [:us]
  
  # Vector json for us map data
  def us
    render :json => @@us_data
  end

  def geography_tweets
    tweetjson = []
    @tweets = Tweet.all

    # Build object with specific properties for json d3 consumption
    @tweets.each do |t|
      unless t.coordinates.nil?
        obj = {}
        obj['type'] = "Feature"
        obj['id'] = t.id
        obj['geometry'] = t.coordinates
        obj['properties'] = t.text
        tweetjson << obj
      end
    end
      # Wraps json with equivalent of header information
      @geographyjson = {type:"FeatureCollection",features: tweetjson }
      render :json => @geographyjson
  end

  def tweet_data
    tweetjson = []
    @tweets = Tweet.all
    
    # Build object with specific properties for json d3 consumption
    @tweets.each do |t|
      obj = {}
      obj['type'] = "Feature"
      obj['id'] = t.id
      obj['geometry'] = t.coordinates
      obj['properties'] = t.text
      tweetjson << obj
    end
    # Wraps json with equivalent of header information
    @completejson = {type:"FeatureCollection",features: tweetjson }

    render :json => @completejson
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_datum
      @datum = Datum.find(params[:id])
    end

    def read_us
      @@us_data = File.read("app/assets/us.json")
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def datum_params
      params[:datum]
    end
end
