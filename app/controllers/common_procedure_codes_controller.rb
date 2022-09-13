class CommonProcedureCodesController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_404

    def index
        common_procedure_codes = CommonProcedureCode.all
        render json: common_procedure_codes
    end

    def show
        common_procedure_code = CommonProcedureCode.find_by!(id: params[:id])
        render json: common_procedure_code
    end

    def show_by_code
        common_procedure_code = CommonProcedureCode.find_by!(code: params[:code])
        render json: common_procedure_code
    end

    private

    def render_404
        render json: { error: "Procedure code not found" }, status: 404
    end
end
