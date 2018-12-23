class CreateReferences < ActiveRecord::Migration[5.2]
  def change
    create_table :references do |t|
      t.integer :block_id, foreign_key: true, index: true
      t.integer :referenced_block_id, foreign_key: true, index: true

      t.timestamps
    end
  end
end
