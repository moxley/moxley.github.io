---
layout: post
title: "Atom Editor Setup for Elixir"
date: 2018-02-05 10:02:41 -0700
comments: true
categories: elixir, atom
published: true
---

I use the following Atom plugins for Elixir:

- language-elixir
- linter-elixirc
- linter-elixir-credo
- atom-elixir-formatter

After installing each of these packages, make sure you configure them. Most of
them don't work without explicit configuration.

Most of these plugins require you to configure either the `elixir` binary path
or the `mix` binary path (or both). To do so, first open a terminal, and run
`which elixir` or `which mix` to get the binary path.

## language-elixir

This is the minimal package you want to use when developing Elixir code.
It provides code syntax highlighting.

## linter-elixirc

This provides feedback when you write bad syntax or syntax that is considered a
warning by the Elixir compiler. It saves time that would be wasted running
tests, only to find out you wrote bad syntax.

## linter-elixir-credo

This provides feedback when you write syntax that violates code style conventions
managed by Credo.

## atom-elixir-formatter

Utility that formats Elixir code with the Elixir Formatter. One side utility of
this package is that it allows you to paste in large data structures from test
output into your test or fixtures, then easily format the resulting code. It
only works if you have Elixir 1.6 or higher.
