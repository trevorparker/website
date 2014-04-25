---
title: Task Management App, Part III
date: '2013-08-30T00:57:41+00:00'
tags:
  - to-do
  - task
  - task management
  - language processing
  - user experience
  - tildone
layout: post
summary: Hashing out the user experience of a command-line task management app.
---

In part three of my task management framework endeavor, I begin to flesh out the user experience that the implementation apps will try to accomplish.

I first want to determine how to handle task deadlines in a way that is intuitive, natural, and predictable for the end user.

<!-- e -->
<span id="more"></span>

#### The optional deadlines

Let's assume that we want to be able to specify a due date in the front matter of a new to-do request or in casual language within the to-do itself.

Now we need a hypothetical set of two meat pies to make. They both have the same ingredients in common but we want to be adventurous with the meat pie we make on Saturday. Instead of using the recipe we know, we're going to look a new one up. We'll stick to the regular recipe on Sunday because that's when family visits and they're picky about the meat pie.

In reverse time order:

```
$ td sunday Make another meat pie
$ td saturday Make a meat pie
$ td before Friday Buy ingredients for meat pies
$ td thursday Find recipe for the meat pie on Saturday
```

The snippet above says a lot of things. Mostly that we eat a lot of meat pies. A human reading it should be able to figure out what's going on. But, in a syntactic sense, how do we interpret this? The last line is the tricky one:

* `(due Thursday) "Find recipe for the meat pie on Saturday"`, vs
* `(due Thursday) (due Saturday) "Find recipe for the meat pie"`

The first interpretation indicates that we need to find a recipe on Thursday for the meat pie we're making on Saturday. The second interpretation invites a paradox, whereby we need to find a recipe on both Thursday and Saturday for the meat pie we're making.

The easy answer would be to prefer the front-matter due date because, well, it stands out from the task itself. But what about this:

```
$ td thursday drink up on friday this week
```

Which therefore becomes:

* `(due Thursday) "drink up on friday this week"`

And what if the event is called "Thursday Drink-Up" and it is, well, usually scheduled for Thursdays. But *this week* it is scheduled for Friday for whatever reason. Uh-oh.

#### The compromise

The point I'm making is that natural language processing of something like this requires context and the ability to interpret that context correctly most of the time. That would require far too much horsepower for lil ol' command-line task app.

So, if we want the flexibility of either using front-matter due dates or casual speech due-dates, we need to *predictably* decide on one if we're presented with a command that satisfies both. We also need a way to force a specific interpretation in the rare case that we unintentionally trigger a due date.

So, this means:

```
$ td thursday Find recipe for the meat pie on Saturday
```

would predictably be interpreted as:

* `(due Thursday) "Find recipe for the meat pie on Saturday"`

And, if we want no due date for this task (and therefore don't want "on Saturday" to trigger a due date):

```
$ td none Find recipe for the meat pie on Saturday
```

would result in:

* `(no due date) "Find recipe for the meat pie on Saturday"`

Finally, if we actually wanted to find a recipe for the meat pie we're making Saturday, this will suffice:

```
$ td Find recipe for the meat pie on Saturday
```

meaning:

* `(due Saturday) "Find recipe for the meat pie"`

And, to wrap this all up, feedback is important. A short snippet that lets the user know what just happened will ensure everyone is on the same page.

All of this hurt my brain a little, but it was immensely helpful. I think I have a simple and stable model for interpreting due dates. In Part 4, I'll work out more details of the user experience that I want to achieve in my implementation apps.
