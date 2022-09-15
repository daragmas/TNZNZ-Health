class Hospital < ApplicationRecord
    has_many :pricings
    has_many :procedure_codes, through: :pricings
    geocoded_by :address
    after_validation :geocode
end
