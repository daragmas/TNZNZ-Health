class Pricing < ApplicationRecord
    belongs_to :hospital
    belongs_to :procedure_code
end
