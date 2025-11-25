class IncomesController < ApplicationController
  include CrudActions

  private

  def model
    Income
  end

  def model_params
    params.require(:income).permit(:amount, :income_source_id, :description, :income_date)
  end

  def includes_resources
    :income_source
  end

  def order_param
    { created_at: :desc }
  end
end