class Api::V1::UsersController < ApplicationController
    before_action :find_user, only: %i[show destroy update edit] 

    def index
        users = User.all
        render json: users
    end

    def create
        user = User.create(user_params)
        if user
          render json: user
        else 
          render json: user.errors
        end 
    end

    def show
        render json: @user
    end

    def edit 
        render json: @user
      end 
    
    def update
        if (@user.update(user_params))
          render json: @user
        else 
          render json: @user.errors  
        end 
    end 

    def destroy
        @user&.destroy 
        render json: {messsage: "Userdeleted"}
    end

    private
    def user_params 
        params.permit(:username, :password)
    end 

    def find_user
        @user = User.find(params[:id])
    end 
end
