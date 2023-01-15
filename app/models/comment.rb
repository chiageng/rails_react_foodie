class Comment < ApplicationRecord
  validates :comment, presence: true
  belongs_to :forum
  belongs_to :user
end
