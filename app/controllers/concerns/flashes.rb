require 'active_support/concern'

module Flashes extend ActiveSupport::Concern
	attr_accessor :flashes

	def initialize
		self.flashes = {}
		@has_errors = false
	end

	def add_error(msg)
		@has_errors = true;
		add_message(msg, :errors)
	end

	def add_alert(msg)
		add_message(msg, :alerts)
	end


	def add_success(msg)
		add_message(msg, :successes)
	end

	def add_message(msg, type)
		flashes[type] ||= []
		flashes[type] << msg
	end

	def render(*args, &block)
		if args[0][:json] != nil
			options = args.extract_options!

			options[:json][:flashes] = flashes
			options[:status] = 422 if @has_errors
			args << options
		end
		super(*args, &block)
	end
end