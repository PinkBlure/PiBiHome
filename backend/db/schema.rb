# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_11_20_234837) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.bigint "category_type_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "color"
    t.string "icon"
    t.index ["category_type_id"], name: "index_categories_on_category_type_id"
    t.index ["name", "category_type_id"], name: "index_categories_on_name_and_category_type_id", unique: true
  end

  create_table "category_types", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_category_types_on_name", unique: true
  end

  create_table "expenses", force: :cascade do |t|
    t.decimal "amount", precision: 10, scale: 2, null: false
    t.text "description", null: false
    t.bigint "category_id", null: false
    t.date "expense_date", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_expenses_on_category_id"
    t.index ["expense_date"], name: "index_expenses_on_expense_date"
  end

  create_table "income_sources", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_income_sources_on_name", unique: true
  end

  create_table "incomes", force: :cascade do |t|
    t.decimal "amount", precision: 10, scale: 2, null: false
    t.text "description", null: false
    t.bigint "income_source_id", null: false
    t.date "income_date", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["income_date"], name: "index_incomes_on_income_date"
    t.index ["income_source_id"], name: "index_incomes_on_income_source_id"
  end

  add_foreign_key "categories", "category_types"
  add_foreign_key "expenses", "categories"
  add_foreign_key "incomes", "income_sources"
end
