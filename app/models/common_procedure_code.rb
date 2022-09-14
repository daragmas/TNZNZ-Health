class CommonProcedureCode < ApplicationRecord
    belongs_to :category

    def self.categories
        self.pluck(:category).uniq
    end
end
