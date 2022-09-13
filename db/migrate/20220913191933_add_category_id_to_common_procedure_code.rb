class AddCategoryIdToCommonProcedureCode < ActiveRecord::Migration[7.0]
  def change
    add_column :common_procedure_codes, :category_id, :integer
  end
end
