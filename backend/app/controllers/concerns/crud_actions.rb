module CrudActions
  extend ActiveSupport::Concern

  def index
    records = model.crud_index(includes: includes_resources, order: order_param)
    render json: records, include: includes_resources
  end

  def show
    record = model.crud_show(params[:id])
    render json: record, include: includes_resources
  end

  def create
    record = model.crud_create(model_params)

    if record.crud_success?
      render json: record, status: :created, include: includes_resources
    else
      render json: { errors: record.crud_errors }, status: :unprocessable_entity
    end
  end

  def update
    record = model.crud_update(params[:id], model_params)

    if record.crud_success?
      render json: record, include: includes_resources
    else
      render json: { errors: record.crud_errors }, status: :unprocessable_entity
    end
  end

  def destroy
    model.crud_destroy(params[:id])
    head :no_content
  end

  private

  def model
    raise NotImplementedError, "Debes implementar el método 'model'"
  end

  def model_params
    raise NotImplementedError, "Debes implementar el método 'model_params'"
  end

  def includes_resources
    nil
  end

  def order_param
    :id
  end
end