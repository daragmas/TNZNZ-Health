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

    def insurances 
    {
      aetna: self.aetna,
      cigna: self.cigna,
      empire_bcbs: self.empire_bcbs,
      emblem: self.emblem,
      united_health_group: self.united_health_group,
      aetna_medicare: self.aetna_medicare,
      agewell_medicare: self.agewell_medicare,
      empire_medicare: self.empire_medicare,
      fidelis_medicare: self.fidelis_medicare,
      emblem_medicare: self.emblem_medicare,
      healthfirst_medicare: self.healthfirst_medicare,
      uhc_medicare: self.uhc_medicare,
      vns_medicare: self.vns_medicare,
      wellcare_medicare: self.wellcare_medicare,
      sieu_1199: self.sieu_1199,
      affinity_molina_medicare: self.affinity_molina_medicare,
      affinity_molina_essential: self.affinity_molina_essential,
      amida_care_medicaid: self.amida_care_medicaid,
      empire_healthplus_medicaid: self.empire_healthplus_medicaid,
      empire_healthplus_essential: self.empire_healthplus_essential,
      empire_healthplus_exchange: self.empire_healthplus_exchange,
      fidelis_medicaid: self.fidelis_medicaid,
      fidelis_essential: self.fidelis_essential,
      healthfirst_essential: self.healthfirst_essential,
      healthfirst_medicaid: self.healthfirst_medicaid,
      emblem_medicaid: self.emblem_medicaid,
      mvp_medicaid: self.mvp_medicaid,
      mvp_essential: self.mvp_essential,
      united_community_plan_medicaid: self.united_community_plan_medicaid,
      united_community_plan_essential: self.united_community_plan_essential,
      vns_medicaid: self.vns_medicaid,
      consumer_health_network: self.consumer_health_network,
      cmn_global: self.cmn_global,
      devon: self.devon,
      equian: self.equian,
      first_health: self.first_health,
      magnacare: self.magnacare,
      multiplan_phcs: self.multiplan_phcs,
      qhm: self.qhm,
      worldwide: self.worldwide
    }    
    end

end
