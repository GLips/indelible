class CreatePages < ActiveRecord::Migration
  def change
    create_table :pages do |t|
      t.text :content

      t.timestamps
    end
  end
end
