class ProcedureCode < ApplicationRecord
    has_many :pricings
    has_many :hospitals, through: :pricings
    belongs_to :category

    def average_cost_across_hospitals
        total = Array.new
        self.pricings.each do |pricing|
            total << pricing.average_cost 
        end
        total.sum / total.length
    end

    def average_cost_at_hospital(hospital_id)
        self.pricings.find_by!(hospital_id: hospital_id).average_cost
    end

    
end
