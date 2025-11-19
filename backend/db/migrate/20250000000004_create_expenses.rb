class CreateExpenses < ActiveRecord::Migration[8.0]
  def change
    create_table :expenses do |t|
      t.decimal :amount, null: false, precision: 10, scale: 2
      t.text :description, null: false
      t.references :category, null: false, foreign_key: true
      t.date :expense_date, null: false

      t.timestamps
    end

    add_index :expenses, :expense_date
  end
end