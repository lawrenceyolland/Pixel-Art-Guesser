class RemoveColumnFromArts < ActiveRecord::Migration[5.2]
  def change
    remove_reference :arts, :category, foreign_key: true
    remove_reference :arts, :user, foreign_key: true
    remove_reference :arts, :game, foreign_key: true
  end
end
