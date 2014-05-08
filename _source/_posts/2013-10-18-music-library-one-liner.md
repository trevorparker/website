---
title: Music Library One-Liner
date: '2013-10-18T13:25:15+00:00'
tags:
  - music
  - one-liner
  - find
  - sed
  - awk
layout: post
summary: A one-liner program that uses sed and awk to generate an overview of my music library.
---

I'm learning more about powerful tools like `sed` and `awk` while taking a break from my [task management app project](/task-management-app-part-3/). One-liners are great for many reasons -- they're easy to stick in your `.bashrc` or `.zshrc` file as aliases or to incorporate into functions.

This particular one-liner simply traverses a music directory, organized as Artist/Album/Songs, and dumps it out in a pretty list.

~~~ bash
cd ~/Music && find . \! -name ".*" | sed -Ee 's/[0-9]{2} //g' -Ee 's/\.(m4a|mp3)$//g' | awk -F/ 'NF > 0 {for (i=2;i<NF;i++) { printf "    " } print $NF}'
~~~

<!-- e -->
<span id="more"></span>

Here's a snippet of what the output looks like:

~~~
...
Phoenix
    Wolfgang Amadeus Phoenix
        Lisztomania
        1901
        Fences
        Love Like A Sunset Part I
        Love Like A Sunset Part II
        Lasso
        Rome
        Countdown
        Girlfriend
        Armistice
R.E.M.
    Reveal
        The Lifting
        I've Been High
        All The Way To Reno (You're Gonna Be A Star)
...
~~~
