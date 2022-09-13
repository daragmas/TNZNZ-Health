class CategoriesController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_404

    def index
        categories = Category.all
        render json: categories
    end

    def show
        category = Category.find_by!(id: params[:id])
        render json: category
    end

    private

    def render_404
        render json: { error: "Category not found" }, status: 404
    end

end
