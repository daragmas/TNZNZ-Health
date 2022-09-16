class InsuranceSerializer < ActiveModel::Serializer
  attributes(
    :id, 
    :coinsurance, 
    :copay, 
    :deductible, 
    :deductible_met,
    :insurance,
    :in_network,
    :nickname,
    :out_of_pocket,
    :out_of_pocket_met,
    :service_category,
  ) 
end
