class User < ApplicationRecord
    has_secure_password
    validate :valid_zip_code
    def valid_zip_code
        errors.add(:zip_code, "must be a valid zip code") unless zip_code =~ /^(\d{5})?(-\d{4})?$/ 
    end
end
