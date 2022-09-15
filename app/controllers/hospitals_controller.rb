class HospitalsController < ApplicationController
    skip_before_action :authorized
    rescue_from ActiveRecord::RecordNotFound, with: :render_404
    def index
        hospitals = Hospital.all
        render json: hospitals
    end

    def show
        hospital = Hospital.find_by!(id: params[:id])
        render json: hospital
    end

    def nearby
        zip_geocode_data = Geocoder.search(params[:zip]).first.data
        zip_lat_lon = [zip_geocode_data["lat"], zip_geocode_data["lon"]]
        nearby_hospitals = Hospital.near(zip_lat_lon)
        render json: nearby_hospitals
    end

    private

    def render_404
        render json: { error: "Hospital not found" }, status: 404
    end
end
