class Art < ApplicationRecord
  belongs_to :category
  belongs_to :user
  belongs_to :game
end
