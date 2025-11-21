class Category < ApplicationRecord
  include Crudable

  belongs_to :category_type
  validates :name, presence: true
  validates :category_type_id, presence: true
  validates :color, presence: true
  validates :icon, presence: true

  scope :ordered, -> { order(:name) }
end