class AddCategoryIdToProcedureCode < ActiveRecord::Migration[7.0]
  def change
    add_column :procedure_codes, :category_id, :integer
    remove_column :procedure_codes, :category
    remove_column :common_procedure_codes, :category
  end
end
