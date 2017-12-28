---
layout: post
title: "Elixir Abstract Syntax"
date: 2017-12-28 10:02:41 -0700
comments: true
categories: elixir
published: true
---
As developers know, program source code is represented as lines of text.

The [Abstract Syntax Tree
(AST)](https://en.wikipedia.org/wiki/Abstract_syntax_tree) is the representation
of the source code as a hierarchical data graph, specifically a tree structure.
With an AST, much of the difficult work parsing the original source code has
been performed, and the syntax can be introspected programatically.

Similar to an AST, the [Abstract Semantic Graph (ASG)](https://en.wikipedia.org/wiki/Abstract_semantic_graph) is a graph of the
semantic representation of the source code. The ASG goes one step further than
the AST by representing semantic information.

<!-- more -->

When Erlang or Elixir source files are compiled, each module is converted to an
Abstract Semantic Graph and saved to a file. This file is called a BEAM file,
and it has a `.beam` extension.

Elixir provides a way to extract either the AST or ASG from source code. This
information is used by tools such as Formatter and Dialyzer for the benefit of
developers.

We'll walk through two techniques for extracting information from program code.

### The Elixir AST

The function `Code.string_to_quoted!/1` converts Elixir source code into Elixir Abstract
Syntax Tree (AST).

```elixir
iex(1)> Code.string_to_quoted!("2 + 3")
{:+, [line: 1], [2, 3]}
```

`string_to_quoted!/1` (and its sibling `string_to_quoted/1`) know that the
above bit of source code is an operation on two operands. It represents the
plus sign as an atom (`:+`), and it represents the two operands as a list
(`[2, 3]`).

The Elixir AST typically contains three-element tuples like the one above. The
first element is an operation or data type. The second element is metadata about
the operation (e.g., source code line number), and the third element is the
arguments of the operation, or in the case of a data type, the data.

Let's try an example on a function call:

```elixir
iex> Code.string_to_quoted!("f()")
{:f, [line: 1], []}
```

The above represents a function call with an operand `:f`. In actuality, the AST
is not sure it's actually a function call. It just knows that the expression
is "call-like", that it takes zero arguments.

```elixir
iex> Code.string_to_quoted!("v")
{:v, [line: 1], nil}
```

Here, the AST gives `nil` to the arguments list, meaning arguments don't apply.
The AST representation does't actually know whether it's a call or a variable.
In Elixir parentheses are optional for a function call, so it could be either.

We'll do one more:

```elixir
iex> Code.string_to_quoted!("%{a: \"a\"}")
{:%{}, [line: 1], [a: "a"]}
```

The above shows what the AST looks like for a map literal.

## The BEAM File

When Elixir (or Erlang) compiles a module, it creates a `.beam` file that
stores the compiled module. If code is compiled using `mix`, the `.beam` files
can be found in `_build/**/lib/**/ebin/*.beam`.

The `.beam` file can be created more directly, using `elixirc`.
This puts the `.beam` file in the current directory. We will
use `elixirc` for the purposes of this article.

We'll start with a sample module:

```elixir
defmodule MyModule do
  def addition do
    2 + 3
  end

  def an_atom do
    :hello
  end

  def a_call do
    value = addition() + 1
    value + 4
  end
end
```

Save the above file to `my_module.ex`, then run the following:

```
$ elixirc my_module.ex
$ file Elixir.MyModule.beam
Elixir.MyModule.beam: Erlang BEAM file
```

Erlang provides the `beam_lib` library and its `chunks/2` function for reading
the `.beam` file:

```elixir
iex> :beam_lib.chunks('Elixir.MyModule.beam', [:abstract_code])
{:ok, {MyModule, [
         abstract_code: {:raw_abstract_v1, [
                           {:attribute, 1, :file, {'my_module.ex', 1}},
                           {:attribute, 1, :module, MyModule},
                           {:attribute, 1, :compile, :no_auto_import},
                           {:attribute, 1, :export, [
                              __info__: 1,
                              a_call: 0,
                              addition: 0,
                              an_atom: 0
                            ]},
                           ...
                           ]}]}}
```

The first argument to `:beam_lib.chunks/2` is the `.beam` file path. Note the
single quotes; it's a _charlist_, not a string.

The second argument is a list of "chunk types" to extract from the `.beam` file.
The full list of available chunk types can be found in the [Erlang Source Code](https://github.com/erlang/otp/blob/master/lib/stdlib/src/beam_lib.erl#L68-L73).

The bulk of the return data is a list of tuples. Some of the tuples contain
the atom `:attributes` as the first element, and the others have `:function` as
the first element.

The tuples having `:function` represent the functions of the module. The third
element in the tuple is the function name.

You'll notice a large function called
`:__info__` that is automatically added to all Elixir modules.

```elixir
{:function, 0, :__info__, 1, [...]}
```

The last three
functions are the ones defined in the module's source code.

```elixir
[
  ...
  {:function, 10, :a_call, 0, [...]},
  {:function, 2, :addition, 0, [...]},
  {:function, 6, :an_atom, 0, [...]}
]
```

Digging into the `:addition` function representation, we can see the semantic
representation of the simple addition operation, `2 + 3`:

```elixir
{
  :op,
  3,
  :+,
  {:integer, 0, 2},
  {:integer, 0, 3}
}
```

If the goal is to get the list of functions defined by the module, a small filter and map is all it takes:

```elixir
{:ok, {module, [abstract_code: {:raw_abstract_v1, attributes}]}} =
  :beam_lib.chunks('Elixir.MyModule.beam', [:abstract_code])

attributes
|> Enum.filter(&(elem(&1, 0) == :function))
|> Enum.map(fn {_, _, name, arity, _} -> {name, arity} end)

# Returns: [__info__: 1, bar: 0, foo: 0]
```

## Conclusion

We've learned how to introspect Elixir source code by extracting the AST and
ASG. It is my hope that this information will help you build the next great
developer tool for Elixir.
