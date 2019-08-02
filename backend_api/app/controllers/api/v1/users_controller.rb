class Api::V1::UsersController < ApplicationController
    def index
        users = User.all
        render json: Api::V1::UserSerializer.new(users)
    end
    def create
        User.create(user_params)
    end

    private

    def user_params
        params.require(:user).permit(:name)
    end
end
