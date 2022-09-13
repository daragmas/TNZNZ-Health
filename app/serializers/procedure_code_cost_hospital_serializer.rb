class ProcedureCodeCostHospitalSerializer < ActiveModel::Serializer
  attributes :id, :code, :description, :average_cost, :hospital_system, :average_cost_this_hospital

  def hospital_system
    hospital = Hospital.find_by!(id: instance_options[:hospital_id])
    hospital[:hospital_system]
  end
  def average_cost
    cost = object.average_cost_across_hospitals
    cost
  end

  def average_cost_this_hospital
    hcost = object.average_cost_at_hospital(instance_options[:hospital_id])
    hcost
  end

end
