---
published: false
layout: post
title: "The Art of Naming"
date: 2017-07-26 21:07:00 -0700
comments: true
categories:
---
# The Art of Naming

In programming, naming is a crucial, and often over-looked skill in the toolset
for building quality software.

### Why Is Naming Important?

A name is code documentation. A well-named function describes what the function does.
A poorly-named function forces the reader to read the code to determine what it does.
After it's determined, the intent of the poorly-named function may still not be apparent.

A well-named function gives the function a single, focused role and responsibility, reducing the chance of abuse.
A well-named module or function can only be abused if the programmer maintaining it ignores the meaning of its name.

As live code, a well-named identifier doesn't go obsolete as easily as static documentation.

### Naming: A Heuristic

Here's a basic heuristic for choosing a good name:

1. Propose a name to start with.
2. Ask six questions about the name to rate its quality.
3. If it isn't high-quality, go back to Step 1.

Here are the six questions to ask about the name:

1. Does it name a business function or object precisely?
2. If it's a noun, does the name communicate its plurality?
3. If it's a boolean or date, does the name indicate it?
4. If it's an attribute of something, does the name indicate it?
5. Is it unambiguous?
6. If it's a noun, does actually name the thing, or does it just name something related to it?

## 1. Does it name a business function or object precisely?

Avoid naming a variable purely in technical terms.
Communicate the business function of a variable.

```javascript
function (users) {
  var user = users[0];
  ...
}

function (array) {
  var first = array[0];
  ...
}
```

This application's business includes the concept of a user.
The first function takes a collection of users and gets the first user from it.
The second function does exactly the same thing, but it's unclear how it fits in the application's business.
`array` is not a business term of your application, unless your application is a language compiler.

Take a deep breath and consider your proposed name carefully. Does it name the business
function or object precisely, or does it name something related to it?
Often, in our rush to get code working, we don't always consider whether the name we've given is accurate.

Let's do an exercise. You've been asked to create a class that does the following:

1. Takes values from a submitted web form
2. Creates a database record from the form values
3. Delivers a notification email to your company's staff

This type of class is sometimes referred to as a Service Object.
By the conventions set forth by your
engineering team for Service Objects, the class name must describe an action, and the action must
specifically be "create". Therefore, the class name must start with the word 'Create*',
followed by a noun. What should that noun be? What is being created?

Should it be named `CreateForm`? Is it creating a form? No, it isn't.
Programmers sometimes forget to ask that question.
Yes, a form is involved in the process, but the form is not what is being created.

The form is being submitted. The word "submitted" does have a
corresponding noun form. It's called a "submission".
So, the class name may accurately be called `CreateFormSubmission`.

## 2. Is it plural?

If the name is a noun, does it indicate whether it's singular or plural?

```javascript
var users = getUsers();
```

Use the same rules for naming that are used in regular English words.

Programmers sometimes fail at this.

## 3. Is it a boolean, date, or neither?

Boolean and date variables may be identified with a naming convention:

```javascript
tryReservation(hasRooms);
recordIt(scheduledAt);
```

Now read it without the convention:

```javascript
tryReservation(rooms);
recordIt(scheduled);
```

Can you easily discern that `rooms` is a boolean, and `scheduled` is a date-time?

## 4. Is it an attribute of something?

As you may have noticed, things in our world have attributes: apple, chair, banana, table, product, user.
These are things that might be represented as objects in an object-oriented language.
They are easy to name: just name them as they are.

However, there is a difference between an attribute and the thing it belongs to.
The name should reflect that distinction.

```javascript
var user = getUser(params.userId);
```

Above, the parameter is named `userId`, because it's the ID of a User.

What about this?

```javascript
var user = getUser(params.user);
```

Is `params.user` a user? No. It's a user ID, so name it as such.

## 5. Is it unambiguous?

```javascript
{
  delete: function() {...},
  destroy: function() {...}
}
```

Do you know the difference between those two functions? In everyday English there
might be a difference, but in software code, the differences are meaningless.
They're synonyms. Make the names distinguishable:

```javascript
{
  deleteRecord: function() {...},
  deleteRecordRecursively: function() {...}
}
```
