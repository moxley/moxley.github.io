---
layout: post
title: "Low-Level ActiveRecord"
date: 2015-09-27 10:58:40 -0700
comments: true
categories: activerecord programming rails
---
With many Rails projects, there is occasionally a need to bypass the normal
ActiveRecord API, and get closer to the low-level SQL API. Here are a few
useful methods that bypass the confines of everyday ActiveRecord.

### #find_by_sql

```ruby
users = User.find_by_sql("SELECT * FROM users WHERE id = 1")
```

This returns model instances for the given SQL string.

`#find_by_sql` also accepts parametrized values, like this:

```ruby
users = User.find_by_sql(["SELECT * FROM users WHERE id = ?", 1])
```

### #select_all

```ruby
users = ActiveRecord::Base.connection.select_all("
  SELECT first_name, created_at
  FROM users
  WHERE id = 1")
```

This returns an array-like object of type `ActiveRecord::Result`. Each item in
the collection is a `Hash` representing a row in the results.

The `ActiveRecord::Result` contains information about the table and its columns.
It knows how to convert column values to their corresponding Ruby types.

### #execute

```ruby
ActiveRecord::Base.connection.execute("SELECT * FROM users WHERE id=1")
```

This returns an array-like object that is specific on the database driver. For
PostgreSQL, this will be a `PG::Result`. Each item in the collection is a
`Hash`. The values of the Hash are strings and nils. No conversion is performed
to convert the values to the appropriate Ruby type, other than NULL to nil.

### #quote

The `select_all` and `execute` methods have no built-in mechanism for escaping
values for the SQL statement.

Something like this is bad practice:

```ruby
users = ActiveRecord::Base.connection.select_all("
  SELECT * FROM users WHERE email='#{email}'")
```

Because we're not sure what is in `email`. It could have an SQL injection
attack, or it could just have unexpected characters that will break
the query. To cover these
cases, ActiveRecord provides `#quote`:

```ruby
conn = ActiveRecord::Base.connection
users = conn.select_all("
  SELECT * FROM users WHERE email=#{conn.quote(email)}")
```

Notice that the SQL statement does not have single quote marks around the email.
`#quote` does that automatically.

### #sanitize_sql_array

Using `#quote` can get unwieldy as more and more values need to be escaped.
There is a private method called `#sanitize_sql_array` that brings back the
parameterized escape mechanism that is present in ActiveRecord's higher-level
API.

```ruby
sql = ActiveRecord::Base.send(:sanitize_sql_array,
  ["SELECT * FROM users WHERE email=?", email])

users = ActiveRecord::Base.connection.select_all(sql)
```

### #connection_config

Sometimes you need to introspect the database connection details. Maybe you have an external utility that performs bulk operations against the database, and
it bypasses ActiveRecord entirely.

```ruby
config = Rails.application.config.database_configuration

{
  "common" => {
    "adapter"           => "postgres",
    "encoding"          => "utf8",
    "postgis_extension" => true,
    "username"          => "user",
    "password"          => "password",
    "host"              => "127.0.0.1",
    "port"              => 5432
  },
  "development" => {
    "adapter"           => "postgres",
    "encoding"          => "utf8",
    "postgis_extension" => true,
    "username"          => "user",
    "password"          => "password",
    "host"              => "127.0.0.1",
    "port"              => 5432,
    "database"          => "database_development"    
  },
  "production" => {
    "adapter"           => "postgres",
    "encoding"          => "utf8",
    "postgis_extension" => true,
    "username"          => "user",
    "password"          => "password",
    "host"              => "127.0.0.1",
    "port"              => 5432,
    "database"          => "database_production"    
  }
}
```

## #structure_load

For times when you need to load a bunch of SQL statements from a file,
ActiveRecord provides `#structure_load`:

```ruby
config = Rails.application.config.database_configuration['development']
sql_file = "tmp/foo.sql"
ActiveRecord::Tasks::DatabaseTasks.structure_load(config, sql_file)
```
