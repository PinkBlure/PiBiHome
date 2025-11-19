# backend/app/controllers/categories_controller.rb
class CategoriesController < ApplicationController
  def index
    @categories = Category.all.includes(:category_type).order('category_types.name, categories.name')
    render json: @categories, include: :category_type
  end

  def create
    @category = Category.new(category_params)
    if @category.save
      render json: @category, include: :category_type, status: :created
    else
      render json: @category.errors, status: :unprocessable_entity
    end
  end

  private

  def category_params
    params.require(:category).permit(:name, :description, :category_type_id)
  end
end