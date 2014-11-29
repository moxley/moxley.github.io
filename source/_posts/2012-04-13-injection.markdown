---
layout: post
title: "Injection"
date: 2012-04-13 12:00
comments: false
categories: [Programming]
---
Within the world of application development, there is a conspiracy.

```php
$sql = "SELECT * FROM users WHERE username='" . $username . "'";
```

<!-- more -->

What's wrong with this code? The problem is that `$username` needs to be escaped before it can be put into the SQL statement. If `$username` contains single quotes, the SQL statement will do something you did not intend. If you already know this, stick around, there's more to this story.

Without escaping the data before it is added to the SQL, the code is vulnerable to Injection attack. Injection is the top security risk in applications, according to [OWASP's Top 10 Security Risks](https://www.owasp.org/index.php/Top_10_2010-Main")>.

Here's the corrected code:

```php
$sql = "SELECT * FROM users WHERE username='" . mysql_real_escape_string($username) . "'";
```

See the really long function name `mysql_real_escape_string()`? The long length is part of a conspiracy to discourage you from escaping injected data.

If you work much with SQL, you may also know about parameterized SQL statements, which automatically escape the injected data, and they reduce the need to concatenate bits of SQL together.

...

Let's pull out the essential parts from the PHP example. The `$username` value is *data*. It's being *injected* into the source code of a computer *language* called SQL. Notice these three keywords:

1.  *data*
2.  *injection*
3.  *language*

Look for these words as we move on.

Here's another example:

```php
<input type="text" name="username" value="<?php echo $username ?>" />
```

The situation is the same as before, but now the language is HTML. We're still *injecting* some *data*, `$username`, into the *language*. And like the first SQL example, `$username` is not escaped.

The security attack that leverages this defect is called Cross-Site Scripting (XSS). XSS is the number two security risk, according to [OWASP's Top Ten list](https://www.owasp.org/index.php/Top_10_2010-Main). XSS is actually just another case of Injection. The defect that causes these two vulnerabilities is the same kind of defect-- failing to escape data that is being injected into a language.

What does PHP provide you to avert certain disaster?

```php
<input
  name="username"
  value="<?php echo htmlspecialchars($username)?>" />
```

In case you weren't thinking of it already, I just want to say, PHP is one *ugly* language.

With a name like `htmlspecialchars()`, you might guess it was not intended to be used often. Actually, nine out of ten times it is perfectly appropriate to use `htmlspecialchars()`. If the length of `htmlspecialchars()` bothers you as much as it does me, I suggest writing your own shortcut:

```php
<?php
function h($str) {
  return htmlspecialchars($str);
}
?>
<input name="username" value="<?php echo h($username) ?>" />
```

Only when you really want to inject actual HTML would you not use `htmlspecialchars()`. And when you do so, be sure the HTML is either trusted or sanitized.

If you are ever in the position to choose a templating language, choose one that escapes injected data by default, because that's what is needed 90% of the time. Yes, 90%. Think about it: how often do you inject HTML into HTML, compared to how often you inject plain old data? Not very often. Note that the top PHP templating languages *do not* escape data by default. The default templating language for Rails 3-- ERB-- escapes data by default. Most of the JavaScript templating languages escape by default.

Next, we'll move on to JavaScript:

```javascript
$('#notice').html('' + message + '</p>);
```

Do you see the pattern? The *language* is HTML, the *data* is `message`. This time, it is JavaScript *injecting* data into another language. Do you know what JavaScript gives us to escape `message` for injecting it into HTML? Nothing. Absolutely nothing. What does jQuery give us for the task?

Nothing.

Yes, really. Escaping data for HTML seems like such an essential task for web programming, yet the designers of both JavaScript and jQuery have provided nothing for it. This is part of the conspiracy.

With JavaScript, we must write our own function to escape data for HTML:

```javascript
// Escape for HTML
function h(str) {
  if (typeof str == 'number') {
    return str;
  }
  else if (!str || !str.length) {
    return '';
  }
  var i, c, out = '',
    trans = {
      '<': '&lt;', '>': '&gt;',
      '"': '&quot;', "'": '&#39;',
      '&': '&amp;'
    };
  for (i = 0; i < str.length; i += 1) {
    c = str[i];
    out += trans[c] || c;
  }
  return out;
}
```

Now ``message'' can be escaped:

```javascript
$('#notice').html('' + h(message) + '</p>);
```

So there you have it: three examples of injection, and three solutions for escaping data before injecting it into language code.

Using a templating language that escapes by default is great, and so is using parameterized SQL statements. But don't think that you don't have to worry about escaping data again. If you work with multiple languages, you will eventually need to call upon an escape function.
