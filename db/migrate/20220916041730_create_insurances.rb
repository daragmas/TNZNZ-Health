class CreateInsurances < ActiveRecord::Migration[7.0]
  def change
    create_table :insurances do |t|
      t.float :coinsurance
      t.float :copay
      t.float :deductible
      t.float :deductible_met
      t.string :insurance
      t.boolean :in_network
      t.float :out_of_pocket
      t.float :out_of_pocket_met
      t.string :service_category
      t.integer :user_id

      t.timestamps
    end
  end
end
