class ApplicationController < ActionController::Base
    include ActionController::Cookies

    skip_before_action :verify_authenticity_token

    before_action :authorized

    rescue_from ActiveRecord::RecordInvalid, with: :render_record_invalid
    rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found
    def encode_token(payload)
        JWT.encode(payload, 'secret')
    end
    def auth_user
        request.headers['Authorization']
    end
    def decoded_token
        if auth_user
            token = auth_user.split(' ')[1]
            begin
                JWT.decode(token, 'secret')
            rescue JWT::DecodeError
                nil
            end
        end
    end
    def current_user
        if decoded_token
            user_id = decoded_token[0]['user_id']
            @user = User.find_by(id: user_id)
        end
        
    end
    def logged_in?
        !!current_user
    end
    def authorized
        render json: {errors: 'Please log in'}, status: :unauthorized unless logged_in?
    end

    def render_record_invalid(e)
        render json: {errors: e.record.errors.full_messages}, status: :unprocessable_entity
    end
    def render_record_not_found(e)
        render json: {errors: "#{e.model} not found"}, status: :not_found
    end
end
