class Income < ApplicationRecord
  belongs_to :income_source

  validates :amount, presence: true, numericality: { greater_than: 0 }
  validates :description, presence: true
  validates :income_date, presence: true

  before_save :set_default_date

  private

  def set_default_date
    self.income_date ||= Date.today
  end
end