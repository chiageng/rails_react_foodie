class CreateForums < ActiveRecord::Migration[7.0]
  def change
    create_table :forums do |t|
      t.string :title, null: false
      t.text :descriptions, null: false
      t.string :image, default: "https://cdn-icons-png.flaticon.com/512/5141/5141534.png"

      t.timestamps
    end
  end
end
