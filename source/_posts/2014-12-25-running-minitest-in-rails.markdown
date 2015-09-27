---
published: false
layout: post
title: "Running Minitest in Rails"
date: 2014-12-25 13:17:24 -0800
comments: true
categories:
---

I have:

1. Rails 4
2. Minitest using spec syntax
3. Including `require 'test_helper'` at the top of each test file
4. Need to run individual tests, using `-n pattern` syntax

```bash
ruby -Itest test/models/photo_spec.rb -n /my_test/
```
