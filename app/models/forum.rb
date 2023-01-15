class Forum < ApplicationRecord
    validates :title, presence: true
    validates :descriptions, presence: true 

    has_many :comments, dependent: :destroy
    belongs_to :user
end
