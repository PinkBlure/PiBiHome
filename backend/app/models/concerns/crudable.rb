module Crudable
  extend ActiveSupport::Concern

  class_methods do
    def crud_index(includes: nil, order: :id)
      query = all
      query = query.includes(includes) if includes
      query = query.order(order)
      query
    end

    def crud_show(id)
      find(id)
    end

    def crud_create(attributes)
      new(attributes).tap(&:save)
    end

    def crud_update(id, attributes)
      find(id).tap { |record| record.update(attributes) }
    end

    def crud_destroy(id)
      find(id).destroy
    end

    def crud_search(term, fields: [:name])
      where(
        fields.map { |field| "#{field} ILIKE ?" }.join(' OR '),
        *fields.map { "%#{term}%" }
      )
    end
  end

  def crud_errors
    errors.full_messages
  end

  def crud_success?
    errors.none?
  end
end