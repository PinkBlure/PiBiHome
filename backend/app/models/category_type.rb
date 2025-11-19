class CategoryType < ApplicationRecord
  has_many :categories, dependent: :destroy

  validates :name, presence: true, uniqueness: true

  scope :ordered, -> { order(:name) }
end