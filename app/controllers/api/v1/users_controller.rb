class Api::V1::UsersController < ApplicationController
  before_action :find_user, only: %i[show destroy update edit] 

    def index
        users = User.all
        render json: users
    end

    def new 
      user = User.new
    end 

    def create
        user = User.new(user_params)
        if user.save
          token = issue_token(user)
          render json: {user: UserSerializer.new(user), jwt: token}
        else 
          render json: user.errors.full_messages
        end 
    end

    def show
      if logged_in?
        render json: current_user
      else 
        render json: {error: "User is not logged in/could not be found"}
      end 
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
      render json: {messsage: "User deleted"}
    end

    private
    def user_params 
      params.permit(:username, :password)
    end 

    def find_user
      @user = User.find(params[:id])
    end 
end
