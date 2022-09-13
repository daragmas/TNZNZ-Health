class Category < ApplicationRecord
    has_many :common_procedure_codes
    has_many :procedure_codes

    def total_procedure_codes
        self.procedure_codes.count + self.common_procedure_codes.count
    end

    def is_common?
        if self.common_procedure_codes.count > 0
            return true
        else 
            return false
        end
    end
end
