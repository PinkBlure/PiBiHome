class CategoriesController < ApplicationController
  include CrudActions

  private

  def model
    Category
  end

  def model_params
    params.require(:category).permit(:name, :category_type_id, :color, :icon, :description)
  end

  def includes_resources
    :category_type
  end

  def order_param
    :name
  end
end