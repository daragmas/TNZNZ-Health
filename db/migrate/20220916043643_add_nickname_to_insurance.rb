class AddNicknameToInsurance < ActiveRecord::Migration[7.0]
  def change
    add_column :insurances, :nickname, :string
  end
end
