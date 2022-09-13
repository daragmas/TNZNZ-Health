class HospitalSerializer < ActiveModel::Serializer
  attributes :id, :hospital_system, :address, :transparency_link
end
