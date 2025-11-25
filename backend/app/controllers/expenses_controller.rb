class ExpensesController < ApplicationController
  include CrudActions

  private

  def model
    Expense
  end

  def model_params
    params.require(:expense).permit(:amount, :category_id, :description, :expense_date)
  end

  def includes_resources
    :category
  end

  def order_param
    { created_at: :desc }
  end
end