class ProcedureCodeCostSerializer < ActiveModel::Serializer
  attributes :id, :code, :description, :average_cost
  
  def average_cost
    cost = object.average_cost_across_hospitals
    cost
  end
end
