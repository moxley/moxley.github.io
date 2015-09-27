---
published: false
layout: post
title: "Rails Best Practices"
date: 2015-01-03 12:37:31 -0800
comments: true
categories:
---

## Best Practices for Ruby on Rails Apps

* For medium and large apps, put business logic in service classes rather than
  models or controllers. See "More Reading" below, for more information on Service
  Objects.
* For medium and large apps, avoid ActiveRecord callbacks and Controller filters.
  Put that logic in service classes instead, so the execution flow is easy to
  follow and maintain.
* Avoid concerns and mixins
* The `lib/` directory should have no dependencies on anything in `app/`,
  except for the Rake tasks.
* Rake tasks should not implement logic. They should delegate to a service
  object instead.
  Rake tasks are difficult or impossible to test. Service objects aren't.
* If following the Single Responsibility Principle, service classes and
  Plain Old Ruby Objects (POROs), typically have a main
  method, like `#call`, or `#perform`. Create a class method with the same
  name that instantiates the object and calls the main method. Don't force
  the caller to make two calls to get the job done.
* Limit controller tests to simple integration (or unit) tests that cover
  basic success and failure cases. Move the logic out of the controller into to  
  service objects and test all the cases on those instead. Controller tests are
  difficult to debug, because exceptions are caught by the ApplicationController,
  instead of the test framework, and the output of the controller is rendered
  HTML or JSON instead of Ruby data.

## More Reading

* http://brewhouse.io/blog/2014/04/30/gourmet-service-objects.html
* https://netguru.co/blog/service-objects-in-rails-will-help
* http://stevelorek.com/service-objects.html
