class ExpensesController < ApplicationController
  include CrudActions

  def index
    records = Expense.includes(category: :category_type).order(created_at: :desc)
    render json: records, include: { category: { include: :category_type } }
  end

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