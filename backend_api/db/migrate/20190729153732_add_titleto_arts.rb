class AddTitletoArts < ActiveRecord::Migration[5.2]
  def change
    add_column :arts, :title, :string
  end
end
