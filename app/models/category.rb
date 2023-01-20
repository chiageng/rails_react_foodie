class Category < ApplicationRecord
    validates :category, presence: true

    belongs_to :user
    
    has_many :forum_categories, dependent: :destroy 
    has_many :forums, through: :forum_categories
end
