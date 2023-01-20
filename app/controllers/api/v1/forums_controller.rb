class Api::V1::ForumsController < ApplicationController

  before_action :find_forum, only: %i[show destroy update edit] 

  def index
    forums = Forum.all.order(created_at: :desc)
    categories = Category.all;
    render json: { forums: forums, categories: categories } 
  end

  def filtered
    category = Category.find_by(category: params[:category])
    forums = category.forums
    render json: forums
  end

  def new 
    categories = Category.all 
    categories = categories.map{ |category| category.category }
    render json: categories
  end 

  def create
    forum = Forum.new(forum_params)
    category = Category.find_by(category: params[:category])
    forum.categories << category
    forum.user = current_user
    if forum.save
      render json: forum 
    else 
      render json: forum.errors
    end 
  end

  def show
    render json: {forum: @forum, comments: @forum.comments}
  end

  def edit 
    render json: @forum
  end 

  def update
    if (@forum.update(forum_params))
      render json: @forum 
    else 
      render json: @forum.errors  
    end 
  end 

  def destroy
    @forum&.destroy 
    render json: {messsage: "Forum deleted"}
  end

  private
  def forum_params 
    params.permit(:title, :descriptions, :image)
  end 

  def find_forum 
    @forum = Forum.find(params[:id])
  end 
end
