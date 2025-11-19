class CreateIncomeSources < ActiveRecord::Migration[8.0]
  def change
    create_table :income_sources do |t|
      t.string :name, null: false
      t.text :description

      t.timestamps
    end

    add_index :income_sources, :name, unique: true
  end
end