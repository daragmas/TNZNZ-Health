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

puts "seeding categories"

categories = [
    "Diagnostic",
    "Diagnostic X-Ray",
    "MRI/CAT Scan",
    "Mammography",
    "Outpatient Surgery",
    "Ultrasound",
    "Physical Therapy",
    "Occupational Therapy",
    "Primary Care",
    "Preventative Care",
    "Mental Health",
    'COVID Vaccinations',
    'Ambulance and Other Transport Services and Supplies',
    'Matrix for Wound Management (Placental, Equine, Synthetic)',
    'Skin Substitute Device',
    'Medical And Surgical Supplies',
    'Administrative, Miscellaneous and Investigational',
    'Enteral and Parenteral Therapy',
    'Other Therapeutic Procedures',
    'Hospital Outpatient Services',
    'Dental Procedures',
    'Durable Medical Equipment',
    'Procedures / Professional Services',
    'Alcohol and Drug Abuse Treatment',
    'Drugs Administered Other than Oral Method',
    'Chemotherapy Drugs',
    'Durable medical equipment (DME) Medicare administrative contractors (MACs)',
    'Components, Accessories and Supplies',
    'Orthotic Procedures and services',
    'Prosthetic Procedures',
    'Miscellaneous Medical Services',
    'Screening Procedures',
    'Other Services',
    'Pathology and Laboratory Services',
    'Temporary Codes',
    'Diagnostic Radiology Services',
    'Temporary National Codes (Non-Medicare)',
    'National Codes Established for State Medicaid Agencies',
    'Coronavirus Diagnostic Panel',
    'Vision Services',
    'Hearing Services',
    'Evaluation & Management',
    'Anesthesia',
    'Surgery',
    'Diagnostic Radiology',
    'Radiation Oncology',
    'Nuclear Medicine',
    'Pathology and Laboratory Services',
    'Immune Globulins, Serum or Recombinant Prods',
    'Immunizations and Vaccinations',
    'Psychiatry',
    'Biofeedback',
    'Dialysis',
    'Gastroenterology',
    'Ophthalmology',
    'Special Otorhinolaryngologic Services',
    'Cardiovascular',
    'Pulmonary',
    'Allergy and Clinical Immunology',
    'Endocrinology',
    'Sleep Medicine Testing and Long-term EEG Procedures',
    'Neurology and Neuromuscular Procesures',
    'Central Nervous System Assessments/Tests (neuro-cognitive, mental status, speech testing)',
    'Health and Behavior Assessment/Intervention',
    'Hydration, Therapeutic, Prophylactic, Diagnostic Injections and Infusions, and Chemotherapy and Other Highly Complex Drug or Highly Complex Biologic Agent Administration',
    'Photodynamic Therapy',
    'Sepcial Dermatological Procedures',
    'Physical Medicine and Rehabilitation',
    'Medical Nutrition Therapy',
    'Acupuncture',
    'Osteopathic Manipulative Treatment',
    'Chiropractic Manipulative Treatment',
    'Education and Training for Patient Self-Management',
    'Non-face-to-face Nonphysician Services',
    'Special Services, Procedures, and Reports',
    'Other Services and Procedures',
    'Home Health Procedures/Services',
    'Medication Therapy Management Services',
    "Emerging Technology, Service or Procedure"
]

categories.each {|e| Category.create!(name: e)}


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
            c.category_id = Category.find_by!(name: match['Category']).id
            t.category_id = Category.find_by!(name: match['Category']).id
            c[:common_procedure?] = true
            c.save!
        else
            # switch statement to determine category
            t[:common_procedure?] = false
            if t.code.last != "F" && t.code.last != "T"
                t.category_id = case t.code
                when /^00/ then 12
                when /^A0/ then 13
                when /^A2/ then 14
                when /^A4100/ then 15
                when /^A4[2-9]/, /^A[5-8]/ then 16
                when /^A9/ then 17
                when /^B/ then 18
                when /^C10[5-6]/ then 19
                when /^C1[7-9]/, /C[2-9]/ then 20
                when /^D/ then 21
                when /^E/ then 22
                when /^G/ then 23
                when /^H/ then 24
                when /^J[0-8]/ then 25
                when /^J[9]/ then 26
                when /^K0/ then 27
                when /^K1/ then 28
                when /^L[0-4]/ then 29
                when /^L[5-9]/ then 30
                when /^M0/ then 31
                when /^M10/ then 32
                when /^M11/ then 33
                when /^P/ then 34
                when /^Q/ then 35
                when /^R/ then 36
                when /^S/ then 37
                when /^T/ then 38
                when /^U000[1-5]/ then 39
                when /^V2/ then 40
                when /^V5/ then 41
                when /^99[2-4]/ then 42
                when /^001[0-9]/ then 43
                when /^[1-6]/ then 44
                when /^7[0-6]/, /^77[0-1]/ then 45
                when /^77[2-9]/ then 46
                when /^7[8-9]/ then 47
                when /^8/ then 48
                when /^90[2-3]/ then 49
                when /^90[4-7]/ then 50
                when /^908/ then 51
                when /^909[0-1]/ then 52
                when /^909[3-9]/ then 53
                when /^91/ then 54
                when /^92[0-4]/ then 55
                when /^92[5-7]/ then 56
                when /^929/, /^93[0-9]/ then 57
                when /^94/ then 58
                when /^95[0-1]/ then 59
                when /^952/ then 60
                when /^957/, /^958[0-2]/ then 61
                when /^958[3-9]/, /^959/, /^960/ then 62
                when /^961[0-3]/ then 63
                when /^9615/ then 64
                when /^96[3-4]/, /^965[0-4]/ then 65
                when /^965[6-7]/ then 66
                when /^969/ then 67
                when /^97[0-7]/ then 68
                when /^9780[2-4]/ then 69
                when /^9781[0-4]/ then 70
                when /^9892/ then 71
                when /^9894/ then 72
                when /^9896[0-2]/ then 73
                when /^9896[6-9]/ then 74
                when /^990/ then 75
                when /^991/ then 76
                when /^995/, /^9960[0-2]/ then 77
                when /^9960-[5-7]/ then 78
                end
            elsif t.code.last == "T"
                t.category_id = 79

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

puts "done"


puts "done 🔥🔥🔥"