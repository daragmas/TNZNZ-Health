class CreateCommonProcedureCodes < ActiveRecord::Migration[7.0]
  def change
    create_table :common_procedure_codes do |t|
      t.string :code
      t.string :description
      t.string :category
      t.boolean :common_procedure?

      t.timestamps
    end
  end
end
