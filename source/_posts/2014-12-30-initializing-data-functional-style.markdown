---
published: false
layout: post
title: "Initializing Data Functional Style"
date: 2014-12-30 09:07:25 -0800
comments: true
categories:
---

Procedural style:

```ruby
class MyClass
  attr_accessor :foo

  def initialize
    @foo = FooLoader.load
  end

  def perform
    foo.data.each do |element|
    end
  end
end
```

Functional style:

```ruby
class MyClass
  attr_accessor :foo

  def initialize
  end

  def perform
    foo.data.each do |element|
    end
  end

  def foo
    @foo ||= FooLoader.load
  end
end
```

Procedural style:

```ruby
unless defined?(RedisConfig)
  module RedisConfig
    attr_accessor :api_data,
                  :api_sidekiq,
                  :supersonic_data,
                  :supersonic_sidekiq

    def self.load
      redis_config = raw_config[Rails.env]
      r = OpenStruct.new(redis_config)
      user_auth = r.password.present? ? "nouser:#{r.password}" : nil

      api_host_part = [user_auth, r.api_host].select(&:present?).join('@')
      api_base_url = "redis://#{api_host_part}"
      api_data_url = "#{api_base_url}/#{r.data_database}"
      api_sidekiq_url = "#{api_base_url}/#{r.sidekiq_database}"

      supersonic_host_part = [user_auth, r.supersonic_host].select(&:present?).join('@')
      supersonic_base_url = "redis://#{supersonic_host_part}"
      supersonic_data_url = "#{supersonic_base_url}/#{r.data_database}"
      supersonic_sidekiq_url = "#{supersonic_base_url}/#{r.sidekiq_database}"

      self.api_data_url = api_data_url
      self.api_sidekiq_url = api_sidekiq_url
      self.supersonic_data_url = supersonic_data_url
      self.supersonic_sidekiq_url = supersonic_sidekiq_url
    end

    def raw_config
      @raw_config ||= YAML.load_file(Rails.root.join('config/redis.yml'))
    end
  end
end
```
