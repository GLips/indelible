class CreateSubscriptions < ActiveRecord::Migration
  def change
    create_table :subscriptions do |t|
      t.integer :user_id
      t.timestamp :current_period_end
      t.timestamp :current_period_start
      t.boolean :active

      t.timestamps
    end
  end
end
