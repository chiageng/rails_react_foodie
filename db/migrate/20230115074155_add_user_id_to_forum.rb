class AddUserIdToForum < ActiveRecord::Migration[7.0]
  def change
    add_column :forums, :user_id, :integer
  end
end
