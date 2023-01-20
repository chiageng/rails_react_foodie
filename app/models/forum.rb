class Forum < ApplicationRecord
    validates :title, presence: true
    validates :descriptions, presence: true 

    has_many :comments, dependent: :destroy
    belongs_to :user
    
    has_many :forum_categories, dependent: :destroy 
    has_many :categories, through: :forum_categories
end
