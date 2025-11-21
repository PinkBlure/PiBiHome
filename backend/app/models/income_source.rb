class IncomeSource < ApplicationRecord
  include Crudable

  has_many :incomes, dependent: :restrict_with_error
  validates :name, presence: true, uniqueness: true
end