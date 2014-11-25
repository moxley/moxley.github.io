I find that 90% of the time, Clojure is more verbose than Ruby. Here's one simple example where Clojure wins a conciseness battle:

```clojure
;; Subtract two vectors
(def a [10 9 8])
(def b [1 2 3])
(map - a b)
;; (9 7 5)
```

```ruby
# Subtract two vectors
a = [10, 9, 8]
b = [1, 2, 3]
a.zip(b).map { |(a, b)| a - b }
# [9, 7, 5]
```

What is it about Ruby that makes it less concise in this example?

In my opinion, the OOP nature of Ruby gets in the way. In OOP, there is a message receiver
(the object), plus zero or more arguments. In Clojure, there is no receiver, only arguments.
In Ruby, the two arguments to Clojure's `map` call have to be split up into the receiver
and the first argument. Additionally, the arguments to Ruby's `map` arrive as a single
array instead of of two distinct scalar arguments. This requires the destructor
parentheses inside the `map` block.

The syntactical division between a receiver and it's arguments is usually not a problem.
But every once in a while, it gets in the way. Another division in OOP is between class
and instance. I've found that this division can sometimes get in the way too.
