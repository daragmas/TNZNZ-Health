class AuthController < ApplicationController
    skip_before_action :authorized, only: [:create]

    def create
        user = User.find_by(username: params[:username])
        if user&.authenticate(params[:password])
            token = encode_token({user_id: user.id})
            render json: {user: user, token: token}, status: :accepted
        else
            render json: {errors: ['Invalid username or password']}, status: :unauthorized
        end
    end
    def show
        render json: @user
    end
    
end
