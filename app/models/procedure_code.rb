class ProcedureCode < ApplicationRecord
    has_many :pricings
    has_many :hospitals, through: :pricings
end
