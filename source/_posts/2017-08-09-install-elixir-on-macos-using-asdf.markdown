---
layout: post
title: "Install Elixir on macOS Using ASDF"
date: 2017-08-09 09:45:01 -0700
comments: true
categories:
---

## Install asdf

```
git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.3.0
echo -e '\n. $HOME/.asdf/asdf.sh' >> ~/.bash_profile
echo -e '\n. $HOME/.asdf/completions/asdf.bash' >> ~/.bash_profile
. ~/.bash_profile
```

## Install Erlang and Elixir Plugins

```
asdf plugin-add erlang https://github.com/asdf-vm/asdf-erlang.git
asdf plugin-add elixir https://github.com/asdf-vm/asdf-elixir.git
```

## Uninstall Erlang and Elixir managed by Brew

```
brew uninstall --force erlang
brew uninstall --force elixir
```

## Install Erlang

Check what versions of Erlang are available:

```
asdf list-all erlang
```

Install and Use Erlang:

```
asdf install erlang 19.3
asdf global erlang 19.3
```

## Install Elixir

Check what versions of Elixir are available:

```
asdf list-all elixir
```

Install and Use Elixir:

```
asdf install elixir 1.4.4
asdf global elixir 1.4.4
```
