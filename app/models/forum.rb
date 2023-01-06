class Forum < ApplicationRecord
    validates :title, presence: true
    validates :descriptions, presence: true 
end
