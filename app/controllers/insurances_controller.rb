class InsurancesController < ApplicationController
    skip_before_action :authorized
    rescue_from ActiveRecord::RecordNotFound, with: :render_404
    rescue_from ActiveRecord::RecordInvalid, with: :render_422

    def index
        insurances = Insurance.all
        render json: insurances
    end

    def show
        insurance = Insurance.find_by!(id: params[:id])
        render json: insurance
    end

    def create
        insurance = Insurance.create!(insurance_params)
        render json: insurance, status: 201
    end

    def index_for_user
        insurances = Insurance.where(user_id: params[:id])
        render json: insurances
    end

    
    def update
        insurance = Insurance.find_by!(id: params[:id])
        insurance.update(insurance_params)
        render json: insurance, status: 202
    end
    
    def destroy
        insurance = Insurance.find_by!(id: params[:id])
        insurance.destroy
        head :no_content
    end
    
    private
        
    def insurance_params
        params.permit(
            :coinsurance, 
            :copay, 
            :deductible, 
            :deductible_met, 
            :insurance, 
            :in_network, 
            :out_of_pocket, 
            :out_of_pocket_met,
            :nickname,             
            :service_category, 
            :user_id
        )
    end

    def render_404
        render json: { error: "Existing Insurance not found" }, status: 404 
    end

    def render_422(exception)
        render json: { errors: exception.record.errors.full_messages }, status: 422
    end

end
