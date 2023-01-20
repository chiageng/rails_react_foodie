class Api::V1::CategoriesController < ApplicationController
    before_action :find_category, only: %i[show destroy update edit] 

    def index
      categories = Category.all
      render json: categories
    end
  
    def create
      category = Category.new(category_params)
      category.user = current_user
      if category.save
        render json: category 
      else 
        render json: category.errors
      end 
    end
  
    def show
      render json: category
    end
  
    def edit 
      render json: @category
    end 
  
    def update
      if (@category.update(category_params))
        render json: @category
      else 
        render json: @category.errors  
      end 
    end 
  
    def destroy
      @category&.destroy 
      render json: {messsage: "Category deleted"}
    end
  
    private
    def category_params 
      params.permit(:category)
    end 
  
    def find_category
      @category = Category.find(params[:id])
    end 
end
