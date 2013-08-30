class AddIsPublicToPages < ActiveRecord::Migration
  def change
    add_column :pages, :is_public, :boolean, default: false
  end
end
