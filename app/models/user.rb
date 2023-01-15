class User < ApplicationRecord
    validates :username, presence: true, uniqueness: true
    has_secure_password

    has_many :forums, dependent: :destroy
    has_many :comments, dependent: :destroy
end
