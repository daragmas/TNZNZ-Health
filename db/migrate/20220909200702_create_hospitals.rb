class CreateHospitals < ActiveRecord::Migration[7.0]
  def change
    create_table :hospitals do |t|
      t.string :hospital_system
      t.string :address
      t.string :transparency_link

      t.timestamps
    end
  end
end
