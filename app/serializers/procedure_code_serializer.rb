class ProcedureCodeSerializer < ActiveModel::Serializer
  attributes :id, :code, :description, :category

  def category
    object.category.name
  end
end
