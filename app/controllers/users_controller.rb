class UsersController < ApplicationController
    skip_before_action :authorized, only: [:create]

    def create
        user = User.create!(user_params)
        token = encode_token({user_id: user.id})
        render json: { user: {id: user.id,username: user.username, email: user.email, zip_code: user.zip_code}, token: token}
    end
    def update
        user = User.find(params[:id])
        puts "zip code"
        puts params
        puts user
        if user.update(user_params)
            return render json: user
        end
        
        render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
    end
    private
    def user_params
        params.permit(:username,:email, :password, :password_confirmation, :zip_code)
    end
end
