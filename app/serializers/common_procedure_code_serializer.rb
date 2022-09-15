class CommonProcedureCodeSerializer < ActiveModel::Serializer
  attributes :id, :code, :description, :category

  # belongs_to :category
  def category
  object.category.name
end
end
