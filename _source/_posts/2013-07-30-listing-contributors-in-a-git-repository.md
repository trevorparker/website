---
title: Listing Contributors in a Git Repository
date: '2013-07-30T22:42:23+00:00'
tags:
  - git
  - command line
  - open source
  - collaboration
layout: post
summary: List a Git repository's contributors, by email address and name.
---

I can't take full credit for crafting this. It came up in discussions in the [comments on GitHub for migrating Twitter Bootstrap to the MIT License](https://github.com/twbs/bootstrap/issues/2054#issuecomment-21035700). Basically, it extracts unique email addresses for all commit authors in a Git repository:

~~~ bash
git log --pretty=format:"%aE" | sort | uniq
~~~

For a more personable list, you can prepend each author's name as well:

~~~ bash
git log --pretty=format:"%aN <%aE>" | sort | uniq
~~~

Running either of those on a popular repository gives you an idea of the enormous collaboration that takes place in open-source projects.

Awesome, right? It's one of those things that make me realize I'm probably not taking full advantage of the tools that I use on a daily basis.
