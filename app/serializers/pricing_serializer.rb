class PricingSerializer < ActiveModel::Serializer
  attributes(
    :id,
    :hospital_id,
    :procedure_code_id,
    :gross_charges,
    :discounted_cash_price,
    :insurances)

    def insurances
      {
      aetna: object.aetna,
      cigna: object.cigna,
      empire_bcbs: object.empire_bcbs,
      emblem: object.emblem,
      united_health_group: object.united_health_group,
      aetna_medicare: object.aetna_medicare,
      agewell_medicare: object.agewell_medicare,
      empire_medicare: object.empire_medicare,
      fidelis_medicare: object.fidelis_medicare,
      emblem_medicare: object.emblem_medicare,
      healthfirst_medicare: object.healthfirst_medicare,
      uhc_medicare: object.uhc_medicare,
      vns_medicare: object.vns_medicare,
      wellcare_medicare: object.wellcare_medicare,
      sieu_1199: object.sieu_1199,
      affinity_molina_medicare: object.affinity_molina_medicare,
      affinity_molina_essential: object.affinity_molina_essential,
      amida_care_medicaid: object.amida_care_medicaid,
      empire_healthplus_medicaid: object.empire_healthplus_medicaid,
      empire_healthplus_essential: object.empire_healthplus_essential,
      empire_healthplus_exchange: object.empire_healthplus_exchange,
      fidelis_medicaid: object.fidelis_medicaid,
      fidelis_essential: object.fidelis_essential,
      healthfirst_essential: object.healthfirst_essential,
      healthfirst_medicaid: object.healthfirst_medicaid,
      emblem_medicaid: object.emblem_medicaid,
      mvp_medicaid: object.mvp_medicaid,
      mvp_essential: object.mvp_essential,
      united_community_plan_medicaid: object.united_community_plan_medicaid,
      united_community_plan_essential: object.united_community_plan_essential,
      vns_medicaid: object.vns_medicaid,
      consumer_health_network: object.consumer_health_network,
      cmn_global: object.cmn_global,
      devon: object.devon,
      equian: object.equian,
      first_health: object.first_health,
      magnacare: object.magnacare,
      multiplan_phcs: object.multiplan_phcs,
      qhm: object.qhm,
      worldwide: object.worldwide
      }    
    end

  has_one :hospital
  has_one :procedure_code
end
