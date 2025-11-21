class CategoryTypesController < ApplicationController
  include CrudActions

  private

  def model
    CategoryType
  end

  def model_params
    params.require(:category_type).permit(:name, :description, :color, :icon)
  end

  def includes_resources
    :categories
  end

  def order_param
    :name
  end
end