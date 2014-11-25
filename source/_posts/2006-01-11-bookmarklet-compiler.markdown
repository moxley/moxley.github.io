---
layout: post
title: "Bookmarklet Compiler"
date: 2006-01-11 12:00
comments: false
categories: [JavaScript]
---
What are bookmarklets? They're small Javascripts, saved as browser bookmarks, that perform useful functions. Here's my favorite [bookmarklet site](http://www.squarefree.com/bookmarklets/). It includes the bookmarklet that helped me develop my first Ajax applications: [Javascript Shell](http://www.squarefree.com/shell/).</p>

## How do you make a bookmarklet?

1.  Write the javascript that you want to be the bookmarklet.
2.  Escape all the special URL characters, like space, parentheses, etc.
3.  Wrap the script in an anonymous Javascript function
4.  Wrap the function in a Javascript URL (`javascript:...`)
5.  Better yet, just do step #1 and use the bookmarklet maker below to do the rest.

## Bookmarklet Maker

This form will take your nicely-formatted Javascript, and turn it into a URL so that you can bookmark it.

Go ahead and enter some javascript.

<script type="text/javascript" src="/bookmarklet/bookmarklet-compiler.js"></script>

<form id="bookmarkletGenerator" method="get" action="javascript:;">
  <textarea cols="80" rows="10" id="source"></textarea>

  <input type="button" onclick="Bookmarklet.forPost()" value="Make Bookmarket"/>
</form>

<div id="generated"></div>

<style type="text/css">#generated { margin-top: 10px; padding: 0 10px; background-color: #aef; }</style>

The Javascript function for creating the bookmarklet maker can be downloaded [from Github](https://raw.github.com/moxley/misc/master/bookmarklet-compiler.js)
