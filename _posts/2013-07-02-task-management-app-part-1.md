---
title: Task Management App, Part I
date: '2013-07-02T01:19:06+00:00'
tags:
  - task
  - to-do
  - task management
layout: post
summary: A simple take on a task management app, drawing inspiration from Taskwarrior.
---

The task management app is almost a clich&eacute; at this point. I still consider it an unsolved problem, at least for myself. My requirements are probably peculiar. I'm looking for an elegant task-management framework more than a consumer-friendly application. This is a perfect scenario to try to tackle the problem myself.

I'll go into details once I start working through each component of planning and writing this thing. Here's a very high-level overview of what I'd like to accomplish:

1. Simplicity in design and implementation
1. A command-line app that I can use daily for work and personal task management
1. A serialization format that is straightfoward and easy to work with
1. Extensible

<!-- e -->
<span id="more"></span>

While the [Taskwarrior](http://taskwarrior.org/) project achieves most of these points, I feel like it doesn't quite align with the technical simplicity I'm looking for. Taskwarrior can, however, serve as a good working example of a functional implementation and assist with keeping the scope of this project in check.

One last requirement for myself: I need to implement a reference application in at least two languages. This will help me judge the simplicity of the framework's design. It will also help keep me from falling into the rut of using one language.
