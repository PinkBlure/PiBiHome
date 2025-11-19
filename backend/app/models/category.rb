class Category < ApplicationRecord
  belongs_to :category_type
  has_many :expenses, dependent: :restrict_with_error

  validates :name, presence: true
  validates :name, uniqueness: { scope: :category_type_id }

  scope :by_type, ->(type_name) { joins(:category_type).where(category_types: { name: type_name }) }
  scope :ordered, -> { includes(:category_type).order('category_types.name, categories.name') }
end