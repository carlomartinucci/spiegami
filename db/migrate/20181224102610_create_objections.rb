class CreateObjections < ActiveRecord::Migration[5.2]
  def change
    create_table :objections do |t|
      t.text :body
      t.integer :reference_id

      t.timestamps
    end
    add_index :objections, :reference_id
  end
end
