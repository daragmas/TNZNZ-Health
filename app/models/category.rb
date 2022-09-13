class Category < ApplicationRecord
    has_many :common_procedure_codes
    has_many :procedure_codes
end
