class Pricing < ApplicationRecord
    belongs_to :hospital
    belongs_to :procedure_code

    def average_cost
        arr = Pricing.column_names.excluding("id", "hospital_id", "procedure_code_id", "gross_charges", "discounted_cash_price", "created_at", "updated_at")
        total_arr = Array.new
        arr.each do |ins|
            total_arr << self[ins.to_sym] unless self[ins.to_sym] == 0
        end
        # puts "#{self.hospital.hospital_system}: #{self.procedure_code.code}"
        total_arr.sum / total_arr.length
    end

end
