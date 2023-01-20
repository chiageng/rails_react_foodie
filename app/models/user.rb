class User < ApplicationRecord
    has_secure_password
    validates :username, presence: true, uniqueness: true
    
    has_many :forums, dependent: :destroy
    has_many :comments, dependent: :destroy
    has_many :categories, dependent: :destroy
end
