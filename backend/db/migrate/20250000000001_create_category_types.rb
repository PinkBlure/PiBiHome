class CreateCategoryTypes < ActiveRecord::Migration[8.0]
  def change
    create_table :category_types do |t|
      t.string :name, null: false
      t.text :description

      t.timestamps
    end

    add_index :category_types, :name, unique: true
  end
end