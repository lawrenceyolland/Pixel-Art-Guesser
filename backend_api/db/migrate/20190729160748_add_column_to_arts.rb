class AddColumnToArts < ActiveRecord::Migration[5.2]
  def change
    add_reference :arts, :game, foreign_key: true
  end
end
