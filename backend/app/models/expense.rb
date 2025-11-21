# app/models/expense.rb
class Expense < ApplicationRecord
  include Crudable

  belongs_to :category
  validates :amount, presence: true, numericality: { greater_than: 0 }
  scope :ordered, -> { order(created_at: :desc) }
end