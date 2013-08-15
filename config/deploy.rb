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

after 'deploy', 'bower:init'
after 'deploy', 'grunt:init_resources'
after 'deploy', 'grunt:build'
after 'deploy', 'deploy:index'
after 'deploy', 'deploy:restart'
after 'deploy', 'deploy:cleanup'

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

	desc 'Move the static index HTML file inside Rails so cookies are set properly'
	task :index do
		run "cd #{release_path}/public && mv index.html ../app/views/home/index.html.erb"
	end

	desc 'Restart Passenger'
	task :restart do
		run "#{try_sudo} touch #{ File.join current_path, 'tmp', 'restart.txt' }"
	end
end