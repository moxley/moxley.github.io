---
layout: post
title: "Clojure Tutorial for the Non-Lisp Programmer"
date: 2008-05-01 12:00
comments: false
categories: [Clojure]
---
I intend to keep this tutorial as accurate and up-to-date as possible. If you have any suggestions for changes, please leave a comment at the bottom of this page.

Clojure is a functional lisp dialect that uses the Java Virtual Runtime as its platform. The language home page is at [http://clojure.org/](http://clojure.org/).

## Table of Contents

*   [A Quick Comparison](#quick-comparison)
*   [Installing Clojure](#install)
*   [Atoms](#atoms)
*   [Vectors](#vectors)
*   [Lists](#lists)
*   [Maps and Sets](#maps-sets)
*   [Defining Variables and Functions](#defs)
*   [Special Forms](#special-forms)
*   [Looping and Iterating](#looping-iterating)
*   [Sequences](#sequences)
*   [Java Integration](#java-integration)
*   [Using Libraries](#libraries)
*   [Additional Resources](#resources)

<a name="quick-comparison"></a>

## A Quick Comparison

In C-like languages, a function call might look something like this:

```c
do_something_with(value1, value2)
```

In Clojure, the same function call would look like this:

```clojure
(do-something-with value1 value2)
```

Here, Clojure's syntax differs in these ways:

1.  The opening parenthesis is to the left of the function name.
2.  There are no commas delimiting the function parameters.
3.  By convention, words in a function name are separated by dashes.

There's not a huge difference.

Here's how adding two values might look in a C-like language:

```c
value1 + value2
```

And here’s how it would look in Clojure:

```clojure
(+ value1 value2)
```

In C, the plus operator goes in between the two operands. In Clojure, the operator is always first, and there can be any number of operands. In this way, there is no syntactic difference between operators and function calls. They are the same. This is a thematic difference between Clojure and non-Lisp languages: Clojure is more simple.

<a name="install"></a>

## Installing Clojure

A fast and easy way to get started with Clojure is to download and run [Clooj](https://github.com/arthuredelstein/clooj#readme). Clooj is an Integrated Development Environment for Clojure.

As an alternative, the Clojure website provides [instructions for installing Clojure the traditional way](http://clojure.org/getting_started).

The primary way of interacting with Clojure is through the REPL (Read-Evaluate-Print-Loop). The REPL Reads expressions that you give it, Evaluates the expressions, Prints the value that is the result, and Loops around for more input.

<a name="atoms"></a>

# Atoms

There are two categories of Clojure expressions, _atoms_ and _lists_. Atoms are like the primitive types in other languages. Let’s use the <span class="caps">REPL</span> to explore some atoms.

### Numbers

```clojure
user=> 5
5
```

The number 5 is evaluated and the result is displayed.

### Booleans

Here’s another atom:

```clojure
user=> true
true
```

Clojure supports boolean `TRUE` and `FALSE` values, represented as `true` and `false` respectively.

### Nil

Here is another important atom:

```clojure
user=> nil
nil
```

This is Clojure’s name for no-value, or null. It resolves to Java’s `null` value.

### Strings

Here is a Clojure string:

```clojure
user=> "Hello, world!"
"Hello, world!"
```

Clojure strings follow the same rules as Java strings, so for instance, `"\t"` represents the ASCII `TAB` character. The Java API is the primary way to make calculations on a string.

### Symbols

Symbols are stand-in names for values. They're sort of like what you would call a constant in other languages. Clojure doesn't have variables. And unlike other languages, Clojure makes a distinction between a symbol and its value.

When a symbol is evaluated, its value is returned:

```clojure
user=> *file*
"NO_SOURCE_PATH"
user=> *compile-path*
"classes"
user=> *clojure-version*
{:major 1, :minor 3, :incremental 0, :qualifier nil}
user=> *command-line-args*
nil
user=> +
#<core$_PLUS_ clojure.core$_PLUS_@6d581e80>
```

The above shows some of Clojure's built-in symbols. By convention, built-in symbols begin and end with '*' if they bind to data. The last symbol shown "+" is a built-in function.

### Keywords

Keywords are like symbols, except that they do not bind to an arbitrary value. They always bind to themselves. Keywords always start with a colon (```:```). Here are some keywords:

```clojure
user=> :a
:a
user=> :_123
:_123
user=> :KEY
:KEY
```

<a name="lists"></a>

## Lists

Near the beginning of the tutorial we saw a function call:

```clojure
=> (+ 3 3 3)
9
```

Function calls use lists to define the call. Lists are comprised of an opening and closing parenthesis, and zero or more elements. Each element is separated by whitespace or commas.

Lists can be both a data structure and a functional call form. When used as a function call, the first element of the lists is a function. Any remaining elements in the list are the function's arguments.

When a list is used to perform an operation, it is called a _form_. The function element of the form is referred to as the _operator_. Strictly, it isn't always a function. There are three kinds of forms: _functions_, _macros_, and _special forms_.

Although the list can be used to perform operations, it can also be used to represent data. There is an important consequence of code and data sharing the same syntax: code can be manipulated as if it were data because it _is_ data.

One way to use lists simply as data is to use Clojure’s built-in operation, `list`:

```clojure
user=> (list 1 2 3)
(1 2 3)
user=> (list a b c)
(a b c)
user=> (list "one" "two" "three")
("one" "two" "three")
```

List items can be atoms, other lists, or other data structures that are part of Clojure.

```clojure
user=> (list :foo (list 1 2 3) [4 5 6])
(:foo (1 2 3) [4 5 6])
```

Clojure also has a short-cut syntax for creating a list as data. Just prepend the list with a single-quote character:

```clojure
user=> '(1 2 3)
(1 2 3)
```

Creating a list this way has a slightly different effect. The list items are left unevaluated. They can be undefined, and Clojure won't complain.

Using some of Clojure’s built-in operations, information can be extracted from the data. The following expression returns the first element of the given list.

```clojure
user=> (first '("one" "two" "three"))
"one"
```

Another operation returns all the elements except the first:

```clojure
user=> (rest '("one" "two" "three"))
("two" "three")
```

<a name="vectors"></a>

## Vectors

The vector is another data structure, similar to a list. Vectors are zero-based arrays. They can contain any value, and any mix of value types, just like lists. Here are a few examples:

```clojure
user=> [1 2 3]
[1 2 3]
user=> [:a 0 "hello"]
[:a 0 "hello"]
user=> []
[]
```

  The nice thing about vectors is you don't have to do anything special to use them as data as you do with lists.

  Other languages give you a handy syntax for getting an array's element by its index. So, how is this accomplished with Clojure's vectors? Perform an operation:

```clojure
user=> ([7 8 9] 2)
9
```

Here, we fetch the value at index `2`, which is `9`. The vector itself is the operator of the form. This may seem a little weird at first, but eventually it makes a lot of sense. Its argument is `2`. The general form for this operation is `(vector index)`. Compare this with JavaScript, which is similar:

```javascript
[7, 8, 9][2]
```

You can use the same operation on vectors as we did earlier with lists:

```clojure
user=> (first [7 8 9])
7
user=> (last [7 8 9])
9
user=> (rest [7 8 9])
(8 9)
```

That last one was a bit unexpected. It didn't return a vector. It looks like a list instead.

<a name="maps-sets"></a>

## Maps and Sets

In addition to lists as a data type, Clojure provides syntax for defining _maps_ and _sets_.

Maps define a set of unique key-value pairs:

```clojure
user=> {"a" 1, "b" 2, "c" 3}
{"a" 1, "b" 2, "c" 3}
```

The map above maps the string `"a"` to the number `1`, `"b"` to the number `2`, and `"c"` to the number `3`. The commas between each pair are optional, to enhance readability of the code. Clojure treats the commas nearly the same as whitespace. You can put commas anywhere between elements of an expression:

```clojure
user=> {"a" 1 "b" 2 "c" 3}
{"a" 1, "b" 2, "c" 3}
user=> {"a", 1, "b", 2, "c", 3}
{"a" 1, "b" 2, "c" 3}
user=> {"a"  1 ,"b" 2 ,"c" 3}
{"a" 1, "b" 2, "c" 3}
```

Notice that Clojure REPL adds commas to the formatted return value.

Once a map is defined, its values can be looked up from key values using the `get` form:

```clojure
user=> (get {"a" 1, "b" 2, "c" 3} "a")
1
user=> (get {"a" 1, "b" 2, "c" 3} "b")
2
user=> (get {"a" 1, "b" 2, "c" 3} "c")
3
user=> (get {"a" 1, "b" 2, "c" 3} "d")
nil
```

However, there’s a shortcut for this:

```clojure
user=> ({"a" 1, "b" 2, "c" 3} "a")
1
user=> ({"a" 1, "b" 2, "c" 3} "b")
2
user=> ({"a" 1, "b" 2, "c" 3} "c")
3
user=> ({"a" 1, "b" 2, "c" 3} "d")
nil
```

Similar to Vectors and lists, Maps can be used as functions of their keys.

There is yet a third way to get a value from a key:

```clojure
user=> (:a {:a 1, :b 2, :c 3})
1
user=> (:b {:a 1, :b 2, :c 3})
2
user=> (:c {:a 1, :b 2, :c 3})
3
user=> (:d {:a 1, :b 2, :c 3})
nil
```

It’s important to get familiar with the last two usages, as they are commonly used in Clojure programs.

<a name="defs"></a>

## Defining Variables and Functions

### `def`

To bind a symbol to a value, use the `def` form:

```clojure
user=> (def x 5)
#'user/x
user=> x
5
user=> (+ 5 x)
10
user=> (def my-list '(1 2 3))
#'user/my-list
user=> my-list
(1 2 3)
user=> (last my-list)
3
```

There a a few things going on when a variable is created. What gets returned from `def` is a _var_, which is a an object that holds a value, such as _5_. Also, a symbol is created, and that symbol is bound to the var.

### `defn`

Functions can be created using `defn`:

```clojure
user=> (defn election-year? [year]
  (zero? (rem year 4)))
#'user/election-year?
user=> (election-year? 2007)
false
user=> (election-year? 2008)
true
user=>
```

Functions are just a kind of object that can be called.

The first argument to a `defn` is the function’s name, which becomes a symbol bound to the function. The second argument is the function’s argument list. Argument lists are always represented by a vector. The remaining arguments of `defn` can be one or more expressions. The result of the last expression is used as the function’s return value.

### Using `fn`

Anonymous functions can be created using `fn`:

```clojure
user=> (fn [x] (+ x 1))
user.eval__2384$fn__2386@c4b579
user=> ((fn [x] (+ x 1)) 9)
10
```

Since functions are just objects, they can be bound to a symbol (assigned to a variable):

```clojure
user=> (def plus-one
     (fn [x] (+ x 1)))
#'user/plus-one
user=> (plus-one 9)
10
```

The `defn` form is just a macro that turns its contents into a `def` + `fn` combination.

### The `doc` form

Nearly all the forms in Clojure have built-in documentation. To quickly find out about a form, pass the form’s name to the `doc` form:

```clojure
user=> (doc first)
-------------------------
clojure/first
([coll])
  Returns the first item in the collection. Calls seq on its
    argument. If coll is nil, returns nil.
nil
```

### Documenting a function

There are multiple ways to add documentation to a function. Here is the easiest:

```clojure
user=> (defn plus-one
  "Returns a number one greater than x"
  [x]
  (+ x 1))
#'user/plus-one
user=> (doc plus-one)
-------------------------
user/plus-one
([x])
  Returns a number one greater than x
nil
```

Here is another way:

```clojure
user=> (defn plus-one
  {:doc "Returns a number one greater than x"}
  [x]
  (+ x 1))
#'user/plus-one
user=> (doc plus-one)
-------------------------
user/plus-one
([x])
  Returns a number one greater than x
nil
```

<a name="special-forms"></a>

## Special Forms

Clojure has several built-in forms, known collectively as _special forms_. This section introduces them and delves further into the types of expressions that are possible with Clojure.

### The `str` form:

The `str` form concatenates two or more values, converting them to strings if necessary, and returns the result:

```clojure
user=> (str "Hello," " world!")
"Hello, world!"
user=> (str 5)
"5"
user=> (str "Value: " 5)
"Value: 5"
```

### The `if` form

The `if` form is similar to the `if` statement in C-like languages.

```clojure
user=> (if true "yes")
"yes"
user=> (if false "yes")
nil
user=> (if false "yes" "no")
"no"
user=> (if nil "yes" "no")
"no"
user=> (if "" true)
true
user=> (if 0 true)
true
user=> (if true "yes" "no")
"yes"
user=> (if (= 1 1) "yes" "no")
"yes"
user=> (if (= 1 1) (+ 2 3) (+ 5 5))
5
user=> (if (= 1 2) (+ 2 3) (+ 5 5))
10
```

If the first argument, converted to a boolean, is true, then the second argument is returned. Otherwise the third argument is returned. The third argument is optional.

In Clojure, when a value is converted to boolean, it is always <span class="caps">TRUE</span>, unless the value is `false` or `nil`. There are many forms that make decisions based on whether a value will be true or false when converted to boolean.

The `if` form works a lot like the C-language ternary operator:

```clojure
v = true ? 1 : 0
```

The ternary operator is usually used in places where an `if` statement is too verbose. However, since Clojure’s `if` form is already succinct, there is no need for a separate operator. You can still break up the expression onto separate lines when it makes sense to do so:

```clojure
user=> (if (= 1 1)
  (+ 2 3)
  (+ 3 4))
5
user=> (if (= "foobar" (str "foo" "bar"))
  "'foo' plus 'bar' equals 'foobar'"
  "'foo' plus 'bar' does not equal 'foobar'")
"'foo' plus 'bar' equals 'foobar'"
```

### The `do` form:

The `do` form is used to execute a number of operations in sequence. Typically in functional programming, expressions are contained by, or are containers for, other expressions, so there isn’t a need to execute operations one after the other. This is fine when the expressions produce a value that will be used by a containing expression. However, there are some occasions where the value of an expression isn’t used. If such an expression does anything useful at all, it is said to have side effects. For example, writing something to standard output, or a file, or a database, are all examples of side-effects.

Clojure provides the `println` form for writing to standard output. In order to use `println` within an expression whose return value we care about, we need to put it in a `do` expression:

```clojure
user=> (do (println "Hello.") (+ 2 2))
Hello.
4
user=> (do (println "Hello.") (println "Hello again.") (+ 2 2))
Hello.
Hello again.
4
```

The `do` operation executes each expression in sequence and returns the result of the last expression.

The `do` form isn’t the only form that lets you perform a number of operations in sequence. `let`, `defn` and `fn` all let you do that too.

One of the things that takes some getting used to is that Clojure is a functional language. All expressions in Clojure return a value. Often, a single Clojure expression will span several lines, where the C-like programmer would write it out the same logic as a block of code consisting of several distinct statements. The distinct statements may assign a value to a variable to be used in the following statements. Programs written in functional languages tend to have larger statements spanning multiple lines rather than a multiline block of code split into smaller statements. This way of building programs can take some getting used to, but once you’ve learned it, the new way can be just as easy as the old. There are several advantages to writing programs this way.

### The `when` form

The `when` form is similar to the `if` form. The differences are that there is no “else” condition, and more than one expression can be added to the `when` form for evaluation when the condition is <span class="caps">TRUE</span>.

```clojure
user=> (when nil "Should return 'nil'")
nil
user=> (when false "Should return 'nil'")
nil
user=> (when true "Yes")
"Yes"
user=> (when true 1)
1
user=> (when true 1 2 3)
3
user=> (when true
  (println "Hello, world")
  "Yes")
Hello, world
"Yes"
user=> (when (= 5 (inc 4))
  "Yes")
"Yes"
```

### The `let` form

The `let` operator is used for setting up and holding temporary values to be used by a containing operation.

```clojure
user=> (let [x 2] (+ x 8))
10
user=> (let [x 2 y 8] (+ x y))
10
user=> (let [x 2 y 8] (= (+ x y) 10))
true
user=> (let [x 3] (+ (* x x) 1))
10
user=> (let [color "Red"] (str "Color is: " color))
"Color is: Red"
user=> (let [color "Red" phrase (str "Color is: " color)]
  (str "Clojure says: " phrase))
"Clojure says: Color is: Red"
```

The `let` form creates a temporary var (`x` and `y` in this case), that can only be used inside the body of the `let` expression. A vector is used to define the var and its value, and vectors are also used by other Clojure forms to declare a list of temporary variables and their assigned values. The vector contains name-value pairs.

<a name="looping-iterating"></a>

## Looping and Iterating

Here are three ways to loop while incrementing an index from 0 to 4 (5 iterations):

```clojure
user=> (loop [i 0]
  (when (< i 5)
    (println i)
    (recur (inc i))))
0
1
2
3
4
nil
user=> (dorun (for [i (range 0 5)]
         (println i)))
0
1
2
3
4
nil
user=> (doseq [i (range 0 5)]
  (println i))
0
1
2
3
4
nil
```

The first example uses the `loop` form, which provides the most flexibility, but requires the most syntactical overhead. The second and third examples are examples of iterating over a sequence, which is a more common kind of looping. The `dorun` and `doseq` calls suppress the return values of the containing expressions.

Let’s look at the `loop` form a little closer.

```clojure
user=> (loop [i 0]
  (when (< i 5)
    (println "i:" i)
    (recur (inc i))))
i: 0
i: 1
i: 2
i: 3
i: 4
nil
```

In the above example, the temporary symbol `i` is bound to a value of `0`. The `when` statement checks to see if `i` is less than `5`. If the test passes, the two expressions inside are evaluated. The `println` expression outputs the value of `i`. Next, the `recur` form is evaluated, which instructs the loop to iterate again with a new value for `i`. The `(inc i)` is short for `(+ i 1)`.

Without the `recur`, a `loop` expression behaves exactly the same as a `let` expression.

<a name="sequences"></a>

## Sequences

Sequences are in a sense, the core of idiomatic Clojure programming. Understand sequences and the forms that work with them, and you will have cleared one of the biggest hurdles to writing significant Clojure programs.

At first glance, a Sequence looks like another data structure. However, a Sequence is not a data structure. It is an interface, or view, into a data structure. A sequence can be derived from a collection. The relation between collection and sequence is similar to the relation between database table and database view.

[Clojure’s section on Sequences](http://clojure.org/sequences) gives an excellent definition.

Let’s get a sequence from a vector:

```clojure
user=> (seq [1 2 3])
(1 2 3)
```

This bit of code doesn’t merely convert the vector into a list. It calls on the vector to produce a sequence of the vector. The <span class="caps">REPL</span> (Read, Evaluate, Print, Loop), as part of its ‘Print’ step, uses the sequence to produce a list so that something meaningful can be displayed.

One way to keep the <span class="caps">REPL</span> from creating a list from the sequence is to enclose the expression in another expression that doesn’t consume the sequence. For example, a method call of the sequence will not consume the sequence. Take `getClass()` for instance:

```clojure
user=> (.getClass (seq [1 2 3]))
clojure.lang.APersistentVector$Seq
```

What gets returned is an APersistentVector$Seq, which is the class that represents a vector’s sequence.

All of Clojure’s built-in data structures have methods to produce a sequence. The sequence interface is formally named clojure.lang.iSeq, or iSeq.

### `first`

Use `first` to get the first item in a sequence:

```clojure
user=> (first (seq [1 2 3]))
1
```

`first` will also take a vector directly, implicitly converting it into a sequence:

```clojure
user=> (first [1 2 3])
1
user=> (first ["a" "b" "c"])
"a"
user=> (first '("A" "B" "C"))
"A"
user=> (first '(:a :b :c))
:a
```

Most of the sequence forms do this implicit conversion, so you can pass any collection that provides an iSeq interface, including any of Clojure’s built-in collection types.

### `rest`

`rest` produces a sequence that consists of every item of the original sequence, minus the first item.

```clojure
user=> (rest [1 2 3])
(2 3)
user=> (rest ["a" "b" "c"])
("b" "c")
user=> (rest '("A" "B" "C"))
("B" "C")
user=> (rest [:a :b :c])
(:b :c)
```

Keep in mind that no new data structure is created. `rest` only creates a logical list (a sequence). It is up to the caller to create a data structure, if needed. In the examples above, the caller is the <span class="caps">REPL</span>, and it collects the sequence into a list so that it can display something meaningful. It is computationally inexpensive to create a sequence.

### `cons`

`cons` creates a new sequence by prepending an element onto a collection. The element is the first argument, and the collection is the second.

```clojure
user=> (cons 1 [2 3])
(1 2 3)
user=> (cons :a [:b :c])
(:a :b :c)
```

Again, no data structure is created by `cons`. The resulting sequence internally consists of separate pointers to the first and second arguments of `cons`. To the user or consumer of the sequence, it appears as one continuous sequence.

<a name="java-integration"></a>

## Java Integration

Clojure provides the ability to interface with Java objects and primitives. Knowing how to do this is essential for non-trival programs.

Let’s start by instantiating a Java `java.util.Date` object:

```clojure
user=> (new java.util.Date)
Mon May 26 10:25:25 PDT 2008
```

Clojure instantiates the `Date` object, then calls and displays its `toString()` method as a visual representation of the object.

To pass arguments to the object’s constructor, just include them in the call to `new`:

```clojure
user=> (new StringBuffer "This is the initial value")
This is the initial value
```

There is also a shortcut syntax for instantiation. Replace the `new` operator and the Java class with only the Java class, but with a period appended to its name:

```clojure
user=> (StringBuffer. "This is the initial value")
This is the initial value
```

To call a method on an instance, use the special dot-method (`.<method>`) form. The operator in this form consists of the method name, prepended with a period. The second argument is the object whose method is called:

```clojure
(.toString (new java.util.Date))
"Thu Apr 05 21:44:36 PDT 2012"
(.toString (java.util.Date.))
"Thu Apr 05 21:45:22 PDT 2012"
```

After the operator and object, any additional arguments are passed as arguments to the method:

```clojure
user=> (def my-hash (java.util.HashMap.))
#'user/my-hash
user=> (.put my-hash "food" "tacos")
nil
user=> (.get my-hash "food")
"tacos"
```

Above, a `symbol` called `my-hash` is created and bound to a HashMap instance. Then a value is added to the HashMap for the key `"food"`. Then the value is retrieved from the HashMap.

Static (class) fields and methods are called with a different syntax:

```clojure
user=> (Integer/MAX_VALUE)
2147483647
user=> (Character/TYPE)
char
user=> (Boolean/valueOf "true")
true
```

Just like with Java, Clojure provides the means to import classes into the current context, so that classes do not need to be written out using the fully-qualified syntax:

```clojure
user=> (import '(java.io FileReader))
nil
user=> (FileReader. "source.txt")
java.io.FileReader@f784d7
```

Multiple classes within a package can be included, like this:

```clojure
user=> (import '(java.io File FileReader))
nil
```

Both the `File` and `FileReader` classes are

imported above.

If the classes are in different packages, use this syntax:

```clojure
user=> (import '(java.io File) '(java.util HashMap))
nil
```

Or you can use two separate import statements:

```clojure
user=> (import '(java.io File))
nil
user=> (import '(java.util HashMap))
```

<a name="libraries"></a>

## Using Clojure Libraries

If you're writing an application, you'll probably end up using a third party library.

### Leiningen

The ideal way to import libraries is to use a packaging tool called Leiningen.

First, [install Leiningen](https://github.com/technomancy/leiningen/). In order to do its job, Leiningen needs to create a new project directory for your project:

```bash
> lein new my-project
```

In the new project directory, it puts a file, `project.clj` that represents your project to Leiningen. Go ahead an edit this file, changing the project description to match your tastes.

There are two main repositories for Clojure libraries: [Clojure Contrib](http://dev.clojure.org/display/doc/Clojure+Contrib), and [Clojars](https://clojars.org/). We'll look at Clojure Contrib.

### Clojure Contrib

The libraries in Clojure Contrib can be found at [the Clojure Contrib libraries list](http://dev.clojure.org/display/doc/Clojure+Contrib). Choose a library to use. For this tutorial, we'll use `data.json`.

Edit your `project.clj` file. Add a new vector to the `:dependencies` vector. This new vector will contain two elements:

```clojure
[org.clojure/data.json "0.1.2"]
```

For Clojure Contrib libraries and any other libraries associated with the Clojure project, the dependency path with start with `org.clojure/`, followed by the library name, `data.json`

So now, the `:dependencies` vector will look something like this:

```clojure
:dependencies [[org.clojure/clojure "1.4.0"]
               [org.clojure/data.json "0.1.2"]]
```

When using Leiningen for your project, you need to use lein to get to the REPL:

```bash
> lein repl
REPL started; server listening on localhost port 64984
user=> 
```

Now the library can be referenced from your code:

```clojure
user=> (use '[clojure.data.json :only (read-json json-str)])
nil
user=> (json-str {:color "red" :name "apple"})       
"{\"name\":\"apple\",\"color\":\"red\"}"
user=> (read-json "{\"width\": 300, \"height\": 200}")
{:width 300, :height 200}
```

<a name="resources"></a>

## Additional Resources

* [ClojureDocs: http://clojuredocs.org/](http://clojuredocs.org/)
* [Clojure Programming Wikibook: http://en.wikibooks.org/wiki/Clojure_Programming](http://en.wikibooks.org/wiki/Clojure_Programming)
