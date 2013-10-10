class CreateParagraphs < ActiveRecord::Migration
  def change
    create_table :paragraphs do |t|
      t.text :content
      t.integer :page_id
      t.integer :order

      t.timestamps
		end

		add_index :paragraphs, :page_id
  end
end
