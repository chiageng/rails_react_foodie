class Api::V1::ForumsController < ApplicationController

  before_action :find_forum, only: %i[show destroy update edit] 

  def index
    forums = Forum.all.order(created_at: :desc)
    render json: forums
  end

  def create
    forum = Forum.new(forum_params)
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
    params.require(:forum).permit(:title, :descriptions, :image)
  end 

  def find_forum 
    @forum = Forum.find(params[:id])
  end 
end
