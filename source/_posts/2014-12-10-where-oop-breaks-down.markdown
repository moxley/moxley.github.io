---
published: false
layout: post
title: "Where OOP Breaks Down"
date: 2014-12-10 07:52:53 -0800
comments: true
categories:
---
* Object-arguments dilemma
  * The object is an argument too, but the syntax separates it
* Data and procedures bound in one package
* Class-instance dilemma
  * Why does the caller always have to instantiate an instance
    just to get work done?
* Where to put functionality
  * A stand-alone functional-only piece of code needs to live in a class
    somewhere. It seems overkill to put it in a class.
