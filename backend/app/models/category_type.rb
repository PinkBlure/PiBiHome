# app/models/category_type.rb
class CategoryType < ApplicationRecord
  include Crudable

  has_many :categories, dependent: :destroy
  validates :name, presence: true, uniqueness: true
  scope :ordered, -> { order(:name) }
end