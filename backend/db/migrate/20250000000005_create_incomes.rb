class CreateIncomes < ActiveRecord::Migration[8.0]
  def change
    create_table :incomes do |t|
      t.decimal :amount, null: false, precision: 10, scale: 2
      t.text :description, null: false
      t.references :income_source, null: false, foreign_key: true
      t.date :income_date, null: false

      t.timestamps
    end

    add_index :incomes, :income_date
  end
end