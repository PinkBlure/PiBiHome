class ChangeExpenseDateToDatetime < ActiveRecord::Migration[8.0]
  def change
    change_column :expenses, :expense_date, :datetime
  end
end
