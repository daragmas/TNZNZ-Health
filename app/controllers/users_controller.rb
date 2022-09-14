class UsersController < ApplicationController
    skip_before_action :authorized, only: [:create]

    def create
        user = User.create!(user_params)
        token = encode_token({user_id: user.id})
        render json: { user: user, token: token}
    end
    def show
        render json: {user: User.find(params[:id])}
    end
    private
    def user_params
        params.permit(:username,:email, :password, :password_confirmation)
    end
end
