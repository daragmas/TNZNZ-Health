class AddLatitudeAndLongitudeToHospitals < ActiveRecord::Migration[7.0]
  def change
    add_column :hospitals, :latitude, :float
    add_column :hospitals, :longitude, :float
  end
end
