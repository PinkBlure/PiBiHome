class ChangeIncomeDateToDatetime < ActiveRecord::Migration[8.0]
  def change
    change_column :incomes, :income_date, :datetime
  end
end
