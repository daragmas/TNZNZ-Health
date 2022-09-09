# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_09_09_200746) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "hospitals", force: :cascade do |t|
    t.string "hospital_system"
    t.string "address"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "pricings", force: :cascade do |t|
    t.float "hospital_id"
    t.float "procedure_code_id"
    t.float "gross_charges"
    t.float "discounted_cash_price"
    t.float "aetna"
    t.float "cigna"
    t.float "empire_bcbs"
    t.float "emblem"
    t.float "united_health_group"
    t.float "aetna_medicare"
    t.float "agewell_medicare"
    t.float "empire_medicare"
    t.float "fidelis_medicare"
    t.float "emblem_medicare"
    t.float "healthfirst_medicare"
    t.float "uhc_medicare"
    t.float "vns_medicare"
    t.float "wellcare_medicare"
    t.float "sieu_1199"
    t.float "affinity_molina_medicare"
    t.float "affinity_molina_essential"
    t.float "amida_care_medicaid"
    t.float "empire_healthplus_medicaid"
    t.float "empire_healthplus_essential"
    t.float "empire_healthplus_exchange"
    t.float "fidelis_medicaid"
    t.float "fidelis_essential"
    t.float "healthfirst_essential"
    t.float "healthfirst_medicaid"
    t.float "emblem_medicaid"
    t.float "mvp_medicaid"
    t.float "mvp_essential"
    t.float "united_community_plan_medicaid"
    t.float "united_community_plan_essential"
    t.float "vns_medicaid"
    t.float "consumer_health_network"
    t.float "cmn_global"
    t.float "devon"
    t.float "equian"
    t.float "first_health"
    t.float "magnacare"
    t.float "multiplan_phcs"
    t.float "qhm"
    t.float "worldwide"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "procedure_codes", force: :cascade do |t|
    t.string "code"
    t.string "description"
    t.string "category"
    t.boolean "common_procedure?"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
