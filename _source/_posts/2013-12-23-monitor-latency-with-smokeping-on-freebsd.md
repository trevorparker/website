---
title: Monitor Latency with SmokePing on FreeBSD
date: '2013-12-23T14:18:09+00:00'
tags:
  - smokeping
  - networking
  - latency
  - freebsd
  - apache
  - rrdtool
layout: post
summary: A quick guide on installing and configuring SmokePing, a network latency monitor, on FreeBSD.
---

I run a couple of Internet-facing servers for my website, side projects, and the like. I also have the pleasure of a home Internet connection that isn't always the best. (Don't we all!) It's useful to be able to monitor network conditions to specific servers or addresses -- usually to determine that my home connection is to blame.

There are numerous solutions for monitoring networked computers ([Nagios](http://www.nagios.org), [Munin](http://munin-monitoring.org), [MTR](http://www.bitwizard.nl/mtr/) in a [screen](https://www.gnu.org/software/screen/) session), but one stands out as being really good at visualizing network latency.

[SmokePing](http://oss.oetiker.ch/smokeping/) -- written by [Tobi Oetiker](http://tobi.oetiker.ch/hp/) of [RRDTool](http://oss.oetiker.ch/rrdtool/) notoriety -- monitors network latency and visualizes it with a number of useful graphs. There are a lot of ways you can configure SmokePing to monitor and present network latency, but it's pretty dang helpful right out of the box.

Installing and configuring SmokePing is pretty straightforward for most Linux distributions, but I had a hard time finding a good example of how to do it on [FreeBSD](http://www.freebsd.org). So, here are the steps I took to get an [Apache](https://httpd.apache.org) and SmokePing stack running.

<!-- e -->
<span id="more"></span>

#### Install SmokePing

SmokePing itself is already distributed with the [FreeBSD Ports Collection](http://www.freebsd.org/ports/index.html). Installing SmokePing is just a matter of building it and its dependencies:

~~~
cd /usr/ports/net-mgmt/smokeping
make config-recursive install clean
~~~

Add SmokePing to `/etc/rc.conf`:

~~~
smokeping_enable="YES"
~~~

#### Configure SmokePing

SmokePing's main configuration file is `/usr/local/etc/smokeping/config`. We'll need to edit this to change some basic configuration settings, as well as to add the targets that we want to monitor:

Find the `owner`, `contact`, and optionally `mailhost` and `sendmail` lines, and change them appropriately.

~~~
owner    = jexample
contact  = justin@example.com
mailhost = mail.example.com
sendmail = /usr/sbin/sendmail
~~~

You'll want to comment out the `*** Alerts ***` and `*** Slaves ***` sections for now:

~~~
# *** Alerts ***
# to = justin@example.com
# from = smokeping@example.com
#
# +someloss
# type = loss
# # in percent
# pattern = >0%,*12*,>0%,*12*,>0%
# comment = loss 3 times  in a row

...

# *** Slaves ***
# secrets=/usr/local/etc/smokeping/smokeping_secrets
# +boomer
# display_name=boomer
# color=0000ff
#
# +slave2
# display_name=another
# color=00ff00
~~~

Now, find the `*** Targets ***` section and set up the targets you want to monitor. Targets are listed hierarchically, with multiple plus signs denoting the depth. The example below divides our targets into "web servers" and "databases".

~~~
+ Targets
menu = Targets
title = Targets
host = /Targets/WebServers/www-east /Targets/WebServers/www-west /Targets/Databases/db-primary /Targets/Databases/db-secondary

++ WebServers
menu = Web Servers
title = Web Servers
host = /Targets/WebServers/www-east /Targets/WebServers/www-west

+++ www-east
menu = www-east
title = www-east
host = www-east.example.com

+++ www-west
menu = www-west
title = www-west
host = www-west.example.com

++ Databases
menu = Databases
title = Databases
host = /Targets/Databases/db-primary /Targets/Databases/db-secondary

+++ db-primary
menu = Primary DB
title = Primary DB
host = db-primary.example.com

+++ db-secondary
menu = Secondary DB
title = Secondary DB
host = db-secondary.example.com
~~~

You don't have to arrange your targets in multiple levels. You can make it as simple as you'd like, or break it down even further.

#### Install Apache, FastCGI, and mod_fcgid

You'll want to install Apache to serve up all of the goodness that SmokePing is generating, along with [FastCGI](http://www.fastcgi.com/) and [mod_fcgid](https://httpd.apache.org/mod_fcgid/). FastCGI is used as glue between Apache and SmokePing to generate graphs and the SmokePing web interface.

~~~
cd /usr/ports/www/apache22
make config-recursive install clean
cd /usr/ports/www/fcgi
make install clean
cd /usr/ports/www/mod_fcgid
make install clean
~~~

Now, add Apache to your `/etc/rc.conf`:

~~~
apache22_enable="YES"
~~~

#### Configure Apache

We'll point `/smokeping` to `/usr/local/smokeping/htdocs` in this example, but you can name this alias anything you'd like. You can even toss it under a subdomain with a VirtualHost.

First, edit `/usr/local/etc/apache22/Includes/smokeping.conf` and add the following lines to this new file:

~~~
LoadModule fcgid_module libexec/apache22/mod_fcgid.so

<IfModule mod_fcgid.c>
    AddHandler fcgid-script .fcgi
</IfModule>

Alias /smokeping "/usr/local/smokeping/htdocs"
<Directory "/usr/local/smokeping/htdocs">
    Options Indexes FollowSymLinks ExecCGI
    AllowOverride None
    Order allow,deny
    Allow from all
</Directory>
~~~

This loads mod_fcgid and tells Apache where to look when serving up `/smokeping`. It also enables `ExecCGI` so that `smokeping.fcgi` can be run.

Next, edit `/usr/local/etc/apache22/httpd.conf` and find the `DirectoryIndex` directive, and append `smokeping.fcgi` to it:

~~~
<IfModule dir_module>
    DirectoryIndex index.html smokeping.fcgi
</IfModule>
~~~

This tells Apache to serve up `smokeping.fcgi` if it's in a directory that we're accessing. Since we've enabled `mod_fcgid` and turned on `ExecCGI` for our SmokePing directory, Apache will run this CGI script and serve the result.

#### Wrapping up

Finally, you're ready to start Apache and SmokePing. First you'll want to check the config for Apache:

~~~
service apache22 configtest
~~~

Now start them both:

~~~
service apache22 start
service smokeping start
~~~

Head to `/smokeping` on your server and make sure the SmokePing page loads successfully. If it does, wait 5-10 minutes, and your graphs should start coming in!

<ul class="clearing-thumbs" data-clearing>
    <li>
        <a href="/assets/img/2013-12-23-monitor-latency-with-smokeping-on-freebsd/smokeping.png">
            <img data-caption="Maybe my Internet connection is fixed &mdash; for now." src="/assets/img/2013-12-23-monitor-latency-with-smokeping-on-freebsd/smokeping.png" alt="A SmokePing graph of my home connection's latency">
        </a>
    </li>
</ul>
