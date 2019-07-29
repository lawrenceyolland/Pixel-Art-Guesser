class AddUserReferenceToArts < ActiveRecord::Migration[5.2]
  def change
    add_reference :arts, :user, foreign_key: true
  end
end
