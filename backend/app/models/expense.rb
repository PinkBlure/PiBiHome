class Expense < ApplicationRecord
  belongs_to :category

  validates :amount, presence: true, numericality: { greater_than: 0 }
  validates :description, presence: true
  validates :expense_date, presence: true

  before_save :set_default_date

  delegate :category_type, to: :category

  private

  def set_default_date
    self.expense_date ||= Date.today
  end
end