class CreatePricings < ActiveRecord::Migration[7.0]
  def change
    create_table :pricings do |t|
      t.float :hospital_id
      t.float :procedure_code_id
      t.float :gross_charges
      t.float :discounted_cash_price
      t.float :aetna
      t.float :cigna
      t.float :empire_bcbs
      t.float :emblem
      t.float :united_health_group
      t.float :aetna_medicare
      t.float :agewell_medicare
      t.float :empire_medicare
      t.float :fidelis_medicare
      t.float :emblem_medicare
      t.float :healthfirst_medicare
      t.float :uhc_medicare
      t.float :vns_medicare
      t.float :wellcare_medicare
      t.float :sieu_1199
      t.float :affinity_molina_medicare
      t.float :affinity_molina_essential
      t.float :amida_care_medicaid
      t.float :empire_healthplus_medicaid
      t.float :empire_healthplus_essential
      t.float :empire_healthplus_exchange
      t.float :fidelis_medicaid
      t.float :fidelis_essential
      t.float :healthfirst_essential
      t.float :healthfirst_medicaid
      t.float :emblem_medicaid
      t.float :mvp_medicaid
      t.float :mvp_essential
      t.float :united_community_plan_medicaid
      t.float :united_community_plan_essential
      t.float :vns_medicaid
      t.float :consumer_health_network
      t.float :cmn_global
      t.float :devon
      t.float :equian
      t.float :first_health
      t.float :magnacare
      t.float :multiplan_phcs
      t.float :qhm
      t.float :worldwide

      t.timestamps
    end
  end
end
