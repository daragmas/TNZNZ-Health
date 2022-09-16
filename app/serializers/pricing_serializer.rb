class PricingSerializer < ActiveModel::Serializer
  attributes(
    :id,
    :hospital_id,
    :procedure_code_id,
    :gross_charges,
    :discounted_cash_price,
    :insurances
  )

    def insurances
      object.insurances
    end

  has_one :hospital
  has_one :procedure_code
end
