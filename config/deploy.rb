require 'bundler/capistrano'

set :application, 'Indelible'
set :repository,  'git@github.com:GLips/indelible.git'
set :deploy_to, '/var/www/sites/indelibleapp.com/html/'

set :scm, :git # You can set :scm explicitly or Capistrano will make an intelligent guess based on known version control directory names
set :branch, 'master'
set :user, 'indelible'
set :use_sudo, false
set :rails_env, 'production'
set :deploy_via, :copy

set :ssh_options, { :forward_agent => true }
set :keep_releases, 5
default_run_options[:pty] = true

depend :remote, :command, 'grunt'
depend :remote, :command, 'npm'
depend :remote, :command, 'compass'
depend :remote, :command, 'bower'

server 'indelibleapp.com', :app, :web, :db, :primary => true

after 'deploy:update_code', 'deploy:migrate'

after 'deploy:update_code', 'bower:init'
after 'deploy:update_code', 'grunt:init_resources'
after 'deploy:update_code', 'grunt:build'
after 'deploy:update_code', 'deploy:analytics'
after 'deploy:update_code', 'deploy:stripe'
after 'deploy:update_code', 'deploy:index'
after 'deploy:update_code', 'deploy:restart'
after 'deploy:update_code', 'deploy:cleanup'

def remote_file_exists?(path)
	results = []
	invoke_command("if [ -e '#{path}' ]; then echo -n 'true'; fi") do |ch, stream, out|
		results << (out == 'true')
	end

	results == [true]
end

def angular_path
	"#{release_path}/angular"
end

def public_index
	'public/index.html'
end

namespace :grunt do

	desc 'Install grunt and dependencies locally if it hasn\'t been done before'
	task :init_resources do
		if(!remote_file_exists? "#{shared_path}/node_modules")
			run "cd #{angular_path} && npm install"
			run "cp -R #{angular_path}/node_modules #{shared_path}/"
		end
	end

	desc 'Prepare frontend files for production'
	task :build do
		run "cp -R #{shared_path}/node_modules #{angular_path}/"
		run "cd #{angular_path} && nohup grunt build"
	end

end

namespace :bower do

	desc 'Install or update frontend packages'
	task :init do
		if(!remote_file_exists? "#{shared_path}/bower_components")
			run "cd #{angular_path} && bower install && cp -r app/bower_components #{shared_path}/"
		else
			run "cp -r #{shared_path}/bower_components #{angular_path}/app/"
			run "cd #{angular_path} && bower update"
		end
		run "cp -r #{angular_path}/app/bower_components #{shared_path}/"
	end

end

namespace :deploy do

	desc 'Switch GA placeholder code for production, put Mixpanel into production mode'
	task :analytics do
		run "cd #{release_path} && sed -i 's/UA-XXXXX-X/UA-18334263-4/g' #{public_index}"
		run "cp #{shared_path}/google* #{release_path}/public"
		run "cd #{release_path} && sed -i 's/mixpanel.set_config({ debug: true });//g' #{public_index}"
		run "cd #{release_path} && sed -i 's/3e7e14568ebc1112d68125d48e1bab8b/70fed09fc5cb6ea84fea294eb05b24e8/g' #{public_index}"
	end


	desc 'Switch Stripe publishable key for production'
	task :stripe do
		run "cd #{release_path} && sed -i 's/pk_yBk1sb8goPw2BC41obwfz46sf9jeT/pk_5Z8lBjxCpL0SCCORteFOd9CL2Miv4/g' #{public_index}"
	end

	desc 'Move the static index HTML file inside Rails so cookies are set properly'
	task :index do
		run "cd #{release_path} && mv #{public_index} app/views/home/index.html.erb"
	end

	desc 'Restart Passenger'
	task :restart do
		run "#{try_sudo} touch #{ File.join current_path, 'tmp', 'restart.txt' }"
	end
end
