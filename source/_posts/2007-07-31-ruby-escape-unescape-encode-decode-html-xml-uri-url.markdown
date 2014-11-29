---
layout: post
title: "Ruby: Escape, Unescape, Encode, Decode, HTML, XML, URI, URL"
date: 2007-07-31 12:00
comments: false
categories: [Ruby]
---
This example shows you how to escape and un-escape a value to be included in a URI and within HTML.

<!-- more -->

```ruby
require 'cgi'

# Escape data for URL query parameters
name = "ruby?"
value = "yes"
url = "http://example.com/?" + CGI.escape(name) + '=' + CGI.escape(value) + "&var=T"
# url: http://example.com/?ruby%3F=yes&var=T

# Escape data for HTML
url = "http://example.com/?ruby%3F=yes&var=T"
html = %(<a href="#{CGI.escapeHTML(url)}">example</a>)
# html: <a href="http://example.com/?ruby%3F=yes&amp;var=T">example</a>

# Unescape HTML-escaped data
url = CGI.unescapeHTML("http://example.com/?ruby%3F=yes&amp;var=T")
# url: http://example.com/?ruby%3F=yes&var=T

# Parse query params:
query = "ruby%3F=yes&var=T"
pairs = query.split('&')    # pairs: ["ruby%3F=yes", "var=T"]
name, value = pairs[0].split('=').map{|v| CGI.unescape(v)}
# name, value: ["ruby?", "yes"]
```
