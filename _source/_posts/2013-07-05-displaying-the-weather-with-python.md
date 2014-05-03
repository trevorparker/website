---
title: Displaying the Weather with Python
date: '2013-07-05T23:57:02+00:00'
tags:
  - programming
  - python
  - weather
  - json
  - vane
layout: post
summary: Developing a Python-based weather tool using the OpenWeatherMap API.
feature: weather-with-python
---

The [OpenWeatherMap](http://openweathermap.org/) API has been making the rounds. It practically came out of nowhere with a simple and open way to access weather data. This inspired me to write a tool that spits out a single, simple line describing the current weather at a location.

I decided to revisit [Python](http://www.python.org/) for this tool. I'll probably use Python as my obligatory second language in implementing a reference app for my [task management framework](/task-management-app-part-1/), so I figured it'd be good to brush up on the pythonic way of doing things.

<!-- e -->
<span id="more"></span>

I have really big dreams of what this toolset, that I'm tentatively calling "Vane," will grow up to be. Right now it's one tool that does one thing. It's as simple as this (I'll leave out the argument parsing bits):

#### Fetch the current weather

``` python
try:
    u = "http://api.openweathermap.org/data/2.5/weather?q={0}&units={1}"
    r = requests.get(u.format(loc, units))
    j = json.loads(r.text)
except:
    sys.stderr.write("Couldn't load current conditions\n")
```

Here we send a request to [OpenWeatherMap's API](http://openweathermap.org/API) asking for the weather at the location the user passed in, with an optional units selection. OpenWeatherMap gives us a JSON object with all sorts of things.

#### Extract what I want

``` python
temperature = j['main']['temp']
temperature_unit = 'F' if (units == 'imperial') else 'C'
conditions = j['weather'][0]['description']
```

We're only interested in `temp` which is inside of `main`, and the `description` within array index 0 of `weather`. In other words, we want the current temperature and a description of the current weather. Also, handle the units displayed depending on if we chose imperial or metric.

#### Print a simple summary

``` python
s = "{0} with a temperature of {1}" u"\u00B0" "{2}"
print s.format(
    conditions[0].upper() + conditions[1:].lower(),
    int(round(temperature)), temperature_unit)
```

If it's cloudy and 72, this will simply print "Cloudy with a temperature of 72&deg;F" to the console.

That's it for now! The code's available on [GitHub](https://github.com/trevorparker/vane) and it's all packaged up for you on [PyPI](https://pypi.python.org/pypi/vane).
