---
published: false
layout: post
title: "How To Reduce Code Logic by 80%"
date: 2014-12-09 10:02:24 -0800
comments: true
categories:
---
* The custom schema
* Schemas in programming languages
  * SQL schema: Tables, columns, column types
  * OOP: Classes, inheritance, instances, methods, members
* Data-Centric Programming
* Advantages:
  * Introspection
  * Composition
  * Runtime modification
  * Less logic
  * Easier to reason
  * Reusability
* Imperative programming is procedural:
  * Step-by-step instructions
  * Holding intermediate values, mutable state
* Declarative programming is unbroken expression:
  * No discrete steps
  * No intermediate values, state
  * Ex: SQL, Clojure
* Not enough attention is given to declarative programming.
* There is growing dissatisfaction of DSL interfaces
* DSLs are sometimes considered "declarative", when usually they're just
  imperative programming that looks declarative.
* The alternative to DSLs is often just more procedural programming with less magic.
* There is a better alternative than procedural programming: Imperative programming
* LightTable, Jamie Brandon
* http://www.chris-granger.com/2013/01/24/the-ide-as-data/
* http://www.chris-granger.com/2012/12/11/anatomy-of-a-knockout/
* http://lighttable.com/2014/07/18/imperative-thinking/
* http://www.curtclifton.net/storage/papers/MoseleyMarks06a.pdf
* You don't need an imperative language to program imperatively
* Anywhere a DSL is used
* Strategy: Separate declarative from imperative
* Example: CSV import/export
* Example: has_scope
* Example: state_machine

* Advantages
  * Introspection
  * Logicless
  * Visual
* Separate imperative from procedural
