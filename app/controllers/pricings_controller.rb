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

    def show_pricing_by_hospital_and_procedure
        p = Pricing.find_by!(hospital_id: params[:hospital_id], procedure_code_id: params[:procedure_code_id])
        render json: p
    end

    private

    def render_404
        render json: { error: "Pricing not found" }, status: 404
    end
end
