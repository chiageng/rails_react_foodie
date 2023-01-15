class Api::V1::CommentsController < ApplicationController
  before_action :find_forum, only: %i[create destroy] 
  def create
    @comment = @forum.comments.create(comment_params)
    @comment.user = current_user
    if @comment 
      render json: @comment
    else 
      render json: @comment.error 
    end 
  end

  def destroy
    @comment = @forum.comments.find(params[:id])
    @comment&.destroy 
    render json: {messsage: "Forum deleted"}
  end

  private 
  def comment_params
    params.permit(:comment)
  end 

  def find_forum 
    @forum = Forum.find(params[:forum_id])
  end 
end
