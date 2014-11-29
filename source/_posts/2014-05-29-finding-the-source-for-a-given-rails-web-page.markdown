---
layout: post
title: "Finding the source for a given Rails web page"
date: 2014-05-29 12:00
comments: false
categories: [Ruby, Rails]
alias: /ruby/finding-the-source-for-a-given-rails-web-page
---
These tips may help those of you who are relatively new to Rails, or maybe even if you're not.

<!-- more -->

## Common tips and tricks

* Look at the URL path (e.g. `/users/100685/edit`).
  Can the action and main view file be determined from CRUD/REST conventions?
  * `/:model/edit` -> edit.html.slim
  * `/:model/1234` -> show.html.slim
  * `/:model/new` -> new.html.slim
  * `/:model` -> index.html.slim
* Look up the path in routes.rb, or even more useful, run `rake routes`

## Finding a controller and action responsible for a given page

1. In development go to your server's output, and clear the screen (`Ctrl+L`,
   for Linux, `Cmd-K` for OS X)
2. Refresh the web page
3. Back to the server's output, scroll to the top of the output. About the second
   line of non-blank log output, you should see something like:
  `Processing by UserseController#edit as HTML`. That's the
  controller (`UsersController`) and action (`edit`).

## Finding a view file for a given page

* If in development, look at the server log. If it is too noisy, use
  `tail -f log/development | grep Rendered` to cut out the noise.
* If in development, add the `rails_view_annotator` gem to your Gemfile,
  and look at the DOM or HTML source. It should have HTML comments identifying
  the view partials responsible for their generated HTML.
