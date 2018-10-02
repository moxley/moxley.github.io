---
layout: post
title: "Atom Editor Setup for Elixir"
date: 2018-02-05 10:02:41 -0700
comments: true
categories: elixir, atom
published: true
---
When working with Elixir, I want the following support from my editor:
- Elixir syntax highlighting
- Compiler errors and warnings displayed when I'm editing Elixir code
- Automatic Elixir code formatting when I save a file
- Automatic dialyzer checking and reporting when I save an Elixir code file

These are the following plugins that provide those features:

- `language-elixir`
- `atom-elixir-formatter`
- `ide-elixir`

Before installing any of these packages, read their README pages carefully.

## language-elixir

This is the minimal package you want to use when developing Elixir code.
It provides code syntax highlighting.

## ide-elixir

The most value I get out of IDE Elixir is the feedback I get from its integration
with the Elixir compiler and Dialyzer.

If you don't care so much about the Dialyzer support, and you want something more
lightweight, I recommend `linter-elixirc`.

## atom-elixir-formatter

Utility that formats Elixir code with the Elixir Formatter. One side utility of
this package is that it allows you to paste in large data structures from test
output into your test or fixtures, then easily format the resulting code. It
only works if you have Elixir 1.6 or higher.
