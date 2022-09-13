class PricingsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_404
    def index
        pricings = Pricing.all
        render json: pricings
    end

    def show
        pricing = Pricing.find_by!(id: params[:id])
        render json: pricing
    end

    private

    def render_404
        render json: { error: "Pricing not found" }, status: 404
    end
end
