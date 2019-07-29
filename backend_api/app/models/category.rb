class Category < ApplicationRecord
    has_many :arts
    has_many :users, through: :arts
end
