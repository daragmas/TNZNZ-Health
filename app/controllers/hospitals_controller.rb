class HospitalsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_404
    def index
        hospitals = Hospital.all
        render json: hospitals
    end

    def show
        hospital = Hospital.find_by!(id: params[:id])
        render json: hospital
    end

    private

    def render_404
        render json: { error: "Hospital not found" }, status: 404
    end
end
