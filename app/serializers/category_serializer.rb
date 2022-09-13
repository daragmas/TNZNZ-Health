class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :codes_in_category, :is_common?

  def codes_in_category
    object.total_procedure_codes
  end

  def is_common?
    object.is_common?
  end

  
end
