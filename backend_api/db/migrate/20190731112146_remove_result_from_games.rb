class RemoveResultFromGames < ActiveRecord::Migration[5.2]
  def change
    remove_column :games, :result, :string
  end
end
