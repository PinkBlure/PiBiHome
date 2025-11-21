class IncomeSourcesController < ApplicationController
  include CrudActions

  private

  def model
    IncomeSource
  end

  def model_params
    params.require(:income_source).permit(:name, :description)
  end

  def includes_resources
    nil
  end

  def order_param
    :name
  end
end