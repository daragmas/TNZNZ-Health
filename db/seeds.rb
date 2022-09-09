# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require 'csv'
require 'json'

Hospital.destroy_all
Pricing.destroy_all
ProcedureCode.destroy_all


puts "seeding hospitals"

@h1 = Hospital.create!(hospital_system: "New York Presbyterian Hospital", address: "11 Broadway 2nd Floor")

puts "seeding CPT codes"

# NYP

json_file = File.read(Rails.root.join('lib', 'seeds', 'nyp.json'))
codes = JSON.parse(json_file)
csv_text = File.read(Rails.root.join('lib', 'seeds', 'common_procedures.csv'))
csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
common_by_code = Array.new
csv.each { |r| common_by_code << r["CPT Code"] }
codes.each do |k|
    t = ProcedureCode.new
    p = Pricing.new
    if k["Code (CPT/DRG)"].to_s.length == 5
        t.code = k["Code (CPT/DRG)"]
        t.description = k["Description"]
        # switch statement to determine category
        t[:common_procedure?] = true if common_by_code.include? t.code
        t.save
        p.hospital_id = @h1.id
        p.procedure_code_id = t.id
        p.aetna = k['Aetna']
        p.cigna = k['Cigna']
        p.empire_bcbs = k['Empire Blue Cross Blue Shield']
        p.emblem = k['Emblem Health']
        p.united_health_group = k['United Health Group']
        p.aetna_medicare = k['Aetna Medicare']
        p.agewell_medicare = k['AgeWell Medicare']
        p.empire_medicare = k['Empire Medicare']
        p.fidelis_medicare = k['Fidelis Medicare']
        p.emblem_medicare = k['Emblem Medicare']
        p.healthfirst_medicare = k['Healthfirst Medicare']
        p.uhc_medicare = k['UHC Community Plan/United Medicare']
        p.vns_medicare = k['VNS Medicare']
        p.wellcare_medicare = k['WellCare Medicare']
        p.sieu_1199 = k['1199']
        p.affinity_molina_medicare = k['Affinity Molina Medicaid/CHP']
        p.affinity_molina_essential = k['Affinity Molina Essential']
        p.amida_care_medicaid = k['Amida Care Medicaid']
        p.empire_healthplus_medicaid = k['Empire Healthplus Medicaid']
        p.empire_healthplus_essential = k['Empire Healthplus Essential']
        p.empire_healthplus_exchange = k['Empire Healthplus Exchange']
        p.fidelis_medicaid = k['Fidelis Medicaid/CHP']
        p.fidelis_essential = k['Fidelis Essential/Exchange']
        p.healthfirst_essential = k['Healthfirst Essential/Exchange']
        p.healthfirst_medicaid = k['Healthfirst Medicaid/CHP']
        p.emblem_medicaid = k['Emblem Medicaid/CHP']
        p.mvp_medicaid = k['MVP Medicaid/CHP']
        p.mvp_essential = k['MVP Essential']
        p.united_community_plan_medicaid = k['United Commuity Plan Medicaid/CHP']
        p.united_community_plan_essential = k['United Commuity Plan Essential']
        p.vns_medicaid = k['VNS Medicaid']
        p.consumer_health_network = k['Consumer Health Network']
        p.cmn_global = k['CMN Global']
        p.devon = k['Devon']
        p.equian = k['Equian']
        p.first_health = k['First Health']
        p.magnacare = k['Magnacare']
        p.multiplan_phcs = k['Multiplan/Beechstreet/PHCS']
        p.qhm = k['QHM']
        p.worldwide = k['Worldwide']
        p.gross_charges = k['Gross Charges']
        p.discounted_cash_price = k['Discounted Cash Price']
        p.save
        puts "saved #{t.code}: #{t.description}, #{Hospital.all.find_by(id: p.hospital_id).hospital_system}"
    else
        puts "skipped #{k["Code (CPT/DRG)"]}"
    end

# Common Procedures


    # csv.each do |row|
    #     c = ProcedureCode.find_by(code: row['CPT Code'])
    #     if c
    #         c[:common_procedure?] = true
    #     end
    # end

end


# puts "seeding..."

# csv_text = File.read(Rails.root.join('lib', 'seeds', '133971298_nyu-langone-health_standardcharges_1.csv'))
# csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
# csv.each do |row|
#     t = ProcedureCode.new
#     t.code = row['Billing Code']
#     t.description = row['Identifier Description']
#     t.save
#     puts "saved... #{t.code}"
# end

# puts "done"


puts "done 🔥🔥🔥"