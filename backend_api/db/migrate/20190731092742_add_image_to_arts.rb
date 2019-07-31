class AddImageToArts < ActiveRecord::Migration[5.2]
  def change
    add_column :arts, :img_url, :string
  end
end
