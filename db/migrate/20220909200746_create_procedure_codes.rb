class CreateProcedureCodes < ActiveRecord::Migration[7.0]
  def change
    create_table :procedure_codes do |t|
      t.string :code
      t.string :description
      t.string :category

      t.timestamps
    end
  end
end
