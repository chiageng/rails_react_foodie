class CreateForumCategories < ActiveRecord::Migration[7.0]
  def change
    create_table :forum_categories do |t|
      t.integer :forum_id
      t.integer :category_id

      t.timestamps
    end
  end
end
