class ProcedureCodesController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_404

    def index
        procedure_codes = ProcedureCode.all
        render json: procedure_codes
    end

    def show
        procedure_code = ProcedureCode.find_by!(id: params[:id])
        render json: procedure_code
    end

    def show_by_code
        procedure_code = ProcedureCode.find_by!(code: params[:code])
        render json: procedure_code
    end

    private

    def render_404
        render json: { error: "Procedure code not found" }, status: 404
    end
end
