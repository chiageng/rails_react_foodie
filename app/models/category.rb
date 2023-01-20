class Category < ApplicationRecord
    validates :category, presence: true

    belongs_to :user
end
