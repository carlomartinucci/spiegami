class CreateBlocks < ActiveRecord::Migration[5.2]
  def change
    create_table :blocks do |t|
      t.string :title
      t.text :body
      t.string :origin

      t.timestamps
    end
  end
end
