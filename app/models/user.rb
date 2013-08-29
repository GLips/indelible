class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

	has_many :pages

	def page_summaries
		pages.select('id, LEFT(content, 150) AS content, is_public, user_id, created_at, updated_at')
	end
end
