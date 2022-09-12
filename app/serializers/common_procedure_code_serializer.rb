class CommonProcedureCodeSerializer < ActiveModel::Serializer
  attributes :id, :code, :description, :category
end
