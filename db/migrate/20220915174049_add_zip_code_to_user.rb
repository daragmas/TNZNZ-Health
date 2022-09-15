class AddZipCodeToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :zip_code, :string
  end
end
