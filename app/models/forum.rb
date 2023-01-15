class Forum < ApplicationRecord
    has_many :comments, dependent: :destroy

    validates :title, presence: true
    validates :descriptions, presence: true 
end
