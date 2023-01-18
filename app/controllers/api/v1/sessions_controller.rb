class Api::V1::SessionsController < ApplicationController

    def create
        @user = User.find_by(username: params[:user][:username])
        if @user && @user.authenticate(params[:user][:password])
            token = issue_token(@user)
            render json: { user: UserSerializer.new(@user), jwt: token }
        else 
            render json:  {messsage: "User not exist or wrong password"}
        end 
    end

    def destroy 
        session[:user_id] = nil 
        render json: {message: "Logout"}
    end 

    private
    def login_params
        params.permit(:username, :password)
    end 
end
