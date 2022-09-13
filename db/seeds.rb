# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require 'csv'
require 'json'
require 'byebug'

Hospital.destroy_all
Pricing.destroy_all
ProcedureCode.destroy_all


puts "seeding hospitals"

h1 = Hospital.create!(hospital_system: "New York Presbyterian Hospital", address: "170 William St, New York, NY 10038", transparency_link: "https://www.nyp.org/patients-visitors/paying-for-care/hospital-price-transparency")
h2 = Hospital.create!(hospital_system: "St. Flat's Hospital", address: "11 Broadway, New York, NY 10004", transparency_link: "https://flatironschool.com/")

puts "seeding CPT codes"

# NYP: we use the json provided by NYP to create procedure codes since it is 
# formatted in the most straightforward way

json_file = File.read(Rails.root.join('lib', 'seeds', 'nyp.json'))
codes = JSON.parse(json_file)
csv_text = File.read(Rails.root.join('lib', 'seeds', 'common_procedures.csv'))
csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
common_by_code = Array.new
csv.each { |r| common_by_code << r["CPT Code"] }
codes.each do |k|
    t = ProcedureCode.new
    p1 = Pricing.new
    p2 = Pricing.new
    if k["Code (CPT/DRG)"].to_s.length == 5
        t.code = k["Code (CPT/DRG)"]
        t.description = k["Description"]
        if common_by_code.include?(t.code)
            t[:common_procedure?] = true
            match = csv.find { |row| row['CPT Code'] == t.code }
            c = CommonProcedureCode.new
            c.code = match['CPT Code']
            c.description = match['Description']
            c.category = match['Category']
            t.category = match['Category']
            c[:common_procedure?] = true
            c.save!
        else
            # switch statement to determine category
            t[:common_procedure?] = false
            if t.code.last != "F" && t.code.last != "T"
                t.category = case t.code
                when /^00/ then "COVID Vaccinations"
                when /^A0/ then "Ambulance and Other Transport Services and Supplies"
                when /^A2/ then "Matrix for Wound Management (Placental, Equine, Synthetic)"
                when /^A4100/ then "Skin Substitute Device"
                when /^A4[2-9]/, /^A[5-8]/ then "Medical And Surgical Supplies"
                when /^A9/ then "Administrative, Miscellaneous and Investigational"
                when /^B/ then "Enteral and Parenteral Therapy"
                when /^C10[5-6]/ then "Other Therapeutic Procedures"
                when /^C1[7-9]/, /C[2-9]/ then "Hospital Outpatient Services"
                when /^D/ then "Dental Procedures"
                when /^E/ then "Durable Medical Equipment"
                when /^G/ then "Procedures / Professional Services"
                when /^H/ then "Alcohol and Drug Abuse Treatment"
                when /^J[0-8]/ then "Drugs Administered Other than Oral Method"
                when /^J[9]/ then "Chemotherapy Drugs"
                when /^K0/ then "Durable medical equipment (DME) Medicare administrative contractors (MACs)"
                when /^K1/ then "Components, Accessories and Supplies"
                when /^L[0-4]/ then "Orthotic Procedures and services"
                when /^L[5-9]/ then "Prosthetic Procedures"
                when /^M0/ then "Miscellaneous Medical Services"
                when /^M10/ then "Screening Procedures"
                when /^M11/ then "Other Services"
                when /^P/ then "Pathology and Laboratory Services"
                when /^Q/ then "Temporary Codes"
                when /^R/ then "Diagnostic Radiology Services"
                when /^S/ then "Temporary National Codes (Non-Medicare)"
                when /^T/ then "National Codes Established for State Medicaid Agencies"
                when /^U000[1-5]/ then "Coronavirus Diagnostic Panel"
                when /^V2/ then "Vision Services"
                when /^V5/ then "Hearing Services"
                when /^99[2-4]/ then "Evaluation & Management"
                when /^001[0-9]/ then "Anesthesia"
                when /^[1-6]/ then "Surgery"
                when /^7[0-6]/, /^77[0-1]/ then "Diagnostic Radiology"
                when /^77[2-9]/ then "Radiation Oncology"
                when /^7[8-9]/ then "Nuclear Medicine"
                when /^8/ then "Pathology and Laboratory Services"
                when /^90[2-3]/ then "Immune Globulins, Serum or Recombinant Prods"
                when /^90[4-7]/ then "Immunizations and Vaccinations"
                when /^908/ then "Psychiatry"
                when /^909[0-1]/ then "Biofeedback"
                when /^909[3-9]/ then "Dialysis"
                when /^91/ then "Gastroenterology"
                when /^92[0-4]/ then "Ophthalmology"
                when /^92[5-7]/ then "Special Otorhinolaryngologic Services"
                when /^929/, /^93[0-9]/ then "Cardiovascular"
                when /^94/ then "Pulmonary"
                when /^95[0-1]/ then "Allergy and Clinical Immunology"
                when /^952/ then "Endocrinology"
                when /^957/, /^958[0-2]/ then "Sleep Medicine Testing and Long-term EEG Procedures"
                when /^958[3-9]/, /^959/, /^960/ then "Neurology and Neuromuscular Procesures"
                when /^961[0-3]/ then "Central Nervous System Assessments/Tests (neuro-cognitive, mental status, speech testing)"
                when /^9615/ then "Health and Behavior Assessment/Intervention"
                when /^96[3-4]/, /^965[0-4]/ then "Hydration, Therapeutic, Prophylactic, Diagnostic Injections and Infusions, and Chemotherapy and Other Highly Complex Drug or Highly Complex Biologic Agent Administration"
                when /^965[6-7]/ then "Photodynamic Therapy"
                when /^969/ then "Sepcial Dermatological Procedures"
                when /^97[0-7]/ then "Physical Medicine and Rehabilitation"
                when /^9780[2-4]/ then "Medical Nutrition Therapy"
                when /^9781[0-4]/ then "Acupuncture"
                when /^9892/ then "Osteopathic Manipulative Treatment"
                when /^9894/ then "Chiropractic Manipulative Treatment"
                when /^9896[0-2]/ then "Education and Training for Patient Self-Management"
                when /^9896[6-9]/ then "Non-face-to-face Nonphysician Services"
                when /^990/ then "Special Services, Procedures, and Reports"
                when /^991/ then "Other Services and Procedures"
                when /^995/, /^9960[0-2]/ then "Home Health Procedures/Services"
                when /^9960-[5-7]/ then "Medication Therapy Management Services"
                end
            elsif t.code.last == "T"
                t.category = "Emerging Technology, Service or Procedure"

            end
        end
        t.save
        p1.hospital_id = h1.id
        p1.procedure_code_id = t.id
        p1.aetna = k['Aetna']
        p1.cigna = k['Cigna']
        p1.empire_bcbs = k['Empire Blue Cross Blue Shield']
        p1.emblem = k['Emblem Health']
        p1.united_health_group = k['United Health Group']
        p1.aetna_medicare = k['Aetna Medicare']
        p1.agewell_medicare = k['AgeWell Medicare']
        p1.empire_medicare = k['Empire Medicare']
        p1.fidelis_medicare = k['Fidelis Medicare']
        p1.emblem_medicare = k['Emblem Medicare']
        p1.healthfirst_medicare = k['Healthfirst Medicare']
        p1.uhc_medicare = k['UHC Community Plan/United Medicare']
        p1.vns_medicare = k['VNS Medicare']
        p1.wellcare_medicare = k['WellCare Medicare']
        p1.sieu_1199 = k['1199']
        p1.affinity_molina_medicare = k['Affinity Molina Medicaid/CHP']
        p1.affinity_molina_essential = k['Affinity Molina Essential']
        p1.amida_care_medicaid = k['Amida Care Medicaid']
        p1.empire_healthplus_medicaid = k['Empire Healthplus Medicaid']
        p1.empire_healthplus_essential = k['Empire Healthplus Essential']
        p1.empire_healthplus_exchange = k['Empire Healthplus Exchange']
        p1.fidelis_medicaid = k['Fidelis Medicaid/CHP']
        p1.fidelis_essential = k['Fidelis Essential/Exchange']
        p1.healthfirst_essential = k['Healthfirst Essential/Exchange']
        p1.healthfirst_medicaid = k['Healthfirst Medicaid/CHP']
        p1.emblem_medicaid = k['Emblem Medicaid/CHP']
        p1.mvp_medicaid = k['MVP Medicaid/CHP']
        p1.mvp_essential = k['MVP Essential']
        p1.united_community_plan_medicaid = k['United Commuity Plan Medicaid/CHP']
        p1.united_community_plan_essential = k['United Commuity Plan Essential']
        p1.vns_medicaid = k['VNS Medicaid']
        p1.consumer_health_network = k['Consumer Health Network']
        p1.cmn_global = k['CMN Global']
        p1.devon = k['Devon']
        p1.equian = k['Equian']
        p1.first_health = k['First Health']
        p1.magnacare = k['Magnacare']
        p1.multiplan_phcs = k['Multiplan/Beechstreet/PHCS']
        p1.qhm = k['QHM']
        p1.worldwide = k['Worldwide']
        p1.gross_charges = k['Gross Charges']
        p1.discounted_cash_price = k['Discounted Cash Price']
        p1.save
        puts "saved #{t.code}: #{t.description}, #{Hospital.all.find_by(id: p1.hospital_id).hospital_system}"
        # Flatiron
        p2.hospital_id = 2
        p2.procedure_code_id = t.id
        p2.aetna  = 16900.00
        p2.cigna  = 16900.00
        p2.empire_bcbs  = 16900.00
        p2.emblem  = 16900.00
        p2.united_health_group  = 16900.00
        p2.aetna_medicare  = 16900.00
        p2.agewell_medicare  = 16900.00
        p2.empire_medicare  = 16900.00
        p2.fidelis_medicare  = 16900.00
        p2.emblem_medicare  = 16900.00
        p2.healthfirst_medicare  = 16900.00
        p2.uhc_medicare  = 16900.00
        p2.vns_medicare  = 16900.00
        p2.wellcare_medicare  = 16900.00
        p2.sieu_1199  = 16900.00
        p2.affinity_molina_medicare  = 16900.00
        p2.affinity_molina_essential  = 16900.00
        p2.amida_care_medicaid  = 16900.00
        p2.empire_healthplus_medicaid  = 16900.00
        p2.empire_healthplus_essential  = 16900.00
        p2.empire_healthplus_exchange  = 16900.00
        p2.fidelis_medicaid  = 16900.00
        p2.fidelis_essential  = 16900.00
        p2.healthfirst_essential  = 16900.00
        p2.healthfirst_medicaid  = 16900.00
        p2.emblem_medicaid  = 16900.00
        p2.mvp_medicaid  = 16900.00
        p2.mvp_essential  = 16900.00
        p2.united_community_plan_medicaid  = 16900.00
        p2.united_community_plan_essential  = 16900.00
        p2.vns_medicaid  = 16900.00
        p2.consumer_health_network  = 16900.00
        p2.cmn_global  = 16900.00
        p2.devon  = 16900.00
        p2.equian  = 16900.00
        p2.first_health  = 16900.00
        p2.magnacare  = 16900.00
        p2.multiplan_phcs  = 16900.00
        p2.qhm  = 16900.00
        p2.worldwide  = 16900.00
        p2.gross_charges  = 16900.00
        p2.discounted_cash_price  = 16900.00
        p2.save
        puts "saved #{t.code}: #{t.description}, #{Hospital.all.find_by(id: p2.hospital_id).hospital_system}"
    else
        puts "skipped #{k["Code (CPT/DRG)"]}"
    end
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