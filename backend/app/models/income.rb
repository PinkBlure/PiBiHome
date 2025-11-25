class Income < ApplicationRecord
  include Crudable

  belongs_to :income_source
  validates :amount, presence: true, numericality: { greater_than: 0 }
  validates :income_source_id, presence: true
  validates :income_date, presence: true

  scope :ordered, -> { order(created_at: :desc) }
end