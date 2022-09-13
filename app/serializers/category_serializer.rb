class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :codes_in_category

  def codes_in_category
    object.total_procedure_codes
  end

  
end
