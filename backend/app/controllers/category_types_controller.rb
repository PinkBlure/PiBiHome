class CategoryTypesController < ApplicationController
  def index
    @category_types = CategoryType.all.includes(:categories).order(:name)
    render json: @category_types, include: :categories
  end

  def create
    @category_type = CategoryType.new(category_type_params)
    if @category_type.save
      render json: @category_type, status: :created
    else
      render json: @category_type.errors, status: :unprocessable_entity
    end
  end

  private

  def category_type_params
    params.require(:category_type).permit(:name, :description, :color, :icon)
  end
end