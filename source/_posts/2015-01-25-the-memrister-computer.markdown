---
layout: post
title: "The Memrister Computer"
date: 2015-01-25 12:57:01 -0800
comments: true
categories:
---

What I want to convey:

* What is it?
  * A new fundamental component of digital circuits
  * Theorized in the 1970s
  * Basis for non- Von Neumann architecture
* What's it good for?
  * Computing and memory in one place
  * More efficient
  * Faster
  * Solve certain classes of problems much faster than Von Neumann architecture
* When will it be available?
  * HP's prototype computer: "The Machine"
* History
  * Leon Chua, 1971

Notes from HP presentation:

* Martin Fink
* 100TB stored on your phone
* Merges different compute platforms into one
* Moonshot
* Components:
  * Special purpose cores
  * Photonics
* Example:
  * 160 Racks, each 1PT = 160PT
  * Behaving as one server
  * Any one byte, accessed under 250ns
  * Compared to 60ns for local DRAM, and 100ns for remote DRAM on i7
* Today, processors and memory have to be physically close to each other
  (on the order of centimeters)
* 1 fiber: 6TB/s
* Memory arranged in cube structure
* Connected to processor via fiber
* Universal Memory
* Traditional: memory pyramid, from top to bottom consisting of:
  1. On-chip cache
  2. Main memory
  3. Mass storage
  * 90% of what an OS does is shuffle (shuttle) data between these layers
  * To balance cost and performance
  * 9-11 layers of memory
* Leave the layers/hierarchy behind: memrister
* Store data at the atomic level instead of using electrons
  * Oxegen ion (2 electrons removed)
* Flip between zero on one at the picosecond range
* Require no energy to maintain state over time
* Simple explanation:
  * Electrons compute
  * Photons communicate
  * Ions store
