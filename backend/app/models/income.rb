# app/models/income.rb
class Income < ApplicationRecord
  include Crudable

  belongs_to :income_source
  validates :amount, presence: true, numericality: { greater_than: 0 }
  scope :ordered, -> { order(created_at: :desc) }
end