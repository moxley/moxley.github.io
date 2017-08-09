---
layout: post
title: "Install Redis on macOS with Homebrew"
date: 2017-08-09 10:02:41 -0700
comments: true
categories:
---

## Install

```
brew update
brew install redis
```

## Upgrade

If Redis is already installed, you might want to upgrade:

```
brew upgrade redis
```

## Verify

Check to see if Redis is already running:

```
redis-cli
```

If it's already running, you can probably stop here.

## Launch on System Boot

Check to see if it is already set up to launch on boot:

```
ls -l ~/Library/LaunchAgents | grep -i redis
```

Make it launch on boot:

```
ln -sfv /usr/local/opt/redis/*.plist ~/Library/LaunchAgents
```

## Management

Redis can be started and stopped with these two commands:

```
brew services start redis
brew services stop redis
```
