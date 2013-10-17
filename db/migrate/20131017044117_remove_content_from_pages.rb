class RemoveContentFromPages < ActiveRecord::Migration
  def change
    remove_column :pages, :content, :text
  end
end
