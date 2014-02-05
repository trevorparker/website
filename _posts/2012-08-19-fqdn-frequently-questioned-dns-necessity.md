---
title: 'FQDN: Frequently Questioned DNS Necessity'
date: '2012-08-19T22:30:00+00:00'
tags:
  - technology
  - routing
  - DNS
  - FQDN
layout: post
---

This is a topic that often confused me when I first began experimenting with web and email server configuration. So, here is an insanely quick guide to the fully qualified domain name (FQDN):

A FQDN uniquely identifies a single device using DNS. Where the domain zone "example.com" may refer to any number of frontend web servers, "phantom.example.com" would refer to the server named "phantom" on the example.com domain. FQDNs are important because they unambiguously point to a single server by name. Web and (especially) email servers often rely heavily on a properly-configured FQDN.

<!-- e -->
<span id="more"></span>

Ensure you've:

1. Given your server a hostname
1. Configured an A and/or AAAA DNS records that points phantom.example.com to the server's IP address (replace "phantom" and "example.com" with your information, of course!)
1. Configured your server's `/etc/hosts` file to reflect the FQDN:

```
IP address     FQDN                    server's name
238.14.23.1    phantom.example.com     phantom
```

That's FQDN in a nutshell! Not too bad, right?
