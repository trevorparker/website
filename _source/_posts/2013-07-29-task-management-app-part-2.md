---
title: Task Management App, Part II
date: '2013-07-29T13:22:22+00:00'
tags:
  - serialization
  - json
  - to-do
  - project
  - task
  - task management
  - tildone
layout: post
summary: JSON, MessagePack, YAML, or CSV? Deciding on the best data serialization format for a command-line task management app.
---

This is part two of my quest to make a task management framework that is simple and extensible. In [part one](/task-management-app-part-1/) I included a list of high-level requirements. I also noted that I plan on implementing the framework in two reference applications, written in two languages, to help me self-evaluate the framework I've created.

This update focuses on the first draft of the serialization format, which is effectively the heart of the framework.

<!-- e -->
<span id="more"></span>

#### Surprise, JSON

[JSON](http://json.org/) is an easy choice for serialization because it is both human-readable and a familiar way to represent data types and objects. I didn't decide upon it without exploring other options, though, such as [MessagePack](http://msgpack.org/), [YAML](http://yaml.org/), and even CSV:

* MessagePack loses because it is less friendly to manipulate by hand. It does, however, have the advantage of being more compact than JSON.
* YAML lies on the other side of the coin: while it is extremely easy to edit by hand, it is too far abstracted from the underlying data types for my tastes.
* CSV falls apart in the object models that I've decided upon for Tasks and Projects.

#### The TilDone object

This is the top-level object that encapsulates all Project and Task objects. I am tentatively calling this framework "TilDone."

~~~ json
{
    "tildone": "000001",
    "projects": [],
    "tasks": []
}
~~~

* `tildone` is a required string specifying the serialization format version
* `projects` is an optional array of Project objects
* `tasks` is an optional array of standalone Task objects

Tasks can be associated with a specific project or stand on their own.

#### The Project object

Projects can contain zero or more Task objects, plus some meta-data.

~~~ json
{
    "id": "1e0b2be8-f70f-11e2-b3fe-7e7c4ab78cdb",
    "description": "To-Do list framework",
    "due": 1379421511,
    "notes": [
        "This is gonna be fun",
        "Insert some epiphany"
    ],
    "tasks": []
}
~~~

* `id` is an auto-generated UUID for this project
* `description` is a required string description of the project
* `due` is an optional integer UNIX epoch time specify when this project should be completed
* `notes` is an optional array of strings for any notes related to this project
* `tasks` is an optional array of Task objects for this project

#### The Task object

A task specifies a single to-do or item to be completed.

~~~ json
{
    "id": "b11a4e34-f712-11e2-85e0-bcc58b41ba03",
    "description": "Decide on a serialization format",
    "complete": true,
    "due": 1374971728,
    "notes": []
}
~~~

* `id` is an auto-generated UUID for this task
* `description` is a required string description of the task
* `complete` is an optional boolean specifying whether this task is complete
* `due` is an optional integer UNIX epoch time specify when this task should be completed
* `notes` is an optional array of strings for any notes related to this task

This lays the groundwork for writing implementation apps. Before writing code, I'd like to hash out the command-line workflow for managing projects and tasks. Part 3 of this series will likely focus on the desired workflow and any revelations I've had since today.
