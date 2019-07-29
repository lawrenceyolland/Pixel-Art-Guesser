class AddColumnToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :result, :boolean
    add_column :games, :score, :integer
  end
end
