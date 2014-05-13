---
title: Hardening SSL in Nginx
tags:
  - nginx
  - ssl
  - tls
  - hsts
  - security
layout: post
summary: A starting point for using strong SSL ciphers in Nginx.
---

Securing your site's web traffic with SSL is more than just slapping an SSL certificate on your server. Times have changed. Things have gotten more nuanced as browsers have aged, ciphers have weakened, and attackers have gotten more creative.

For starters, you'll want to choose a set of ciphers that provide a high assurance of security without neglecting visitors on older browsers.

<!-- e -->
<span id="more"></span>

### Stronger Ciphers

Ciphers make encryption and message authentication work. If a cipher is determined to be weak or vulnerable to attack, its usefulness is instantly degraded. Unfortunately a balance has to be maintained between the set of ciphers that are still good enough to be useful and the set of ciphers that are supported by your site's visitors.

At the time of writing, the following [Nginx](http://nginx.org/) configuration is what is used on this site, and achieves an A+ rating on the [Qualys SSL Labs test](https://www.ssllabs.com/ssltest/index.html):

~~~
ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2;
ssl_prefer_server_ciphers on;
ssl_ciphers ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA256:ECDHE-RSA-RC4-SHA:ECDHE-RSA-AES256-SHA:DHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA:RC4-SHA:!aNULL:!MD5:!DSS;
ssl_session_timeout 5m;
ssl_session_cache builtin:1000 shared:SSL:10m;
~~~

The most important bits here are the `ssl_protocols`, `ssl_prefer_server_ciphers`, and `ssl_ciphers` lines.

We snuff out older SSL versions with the `ssl_protocols` line. To help ensure that the browser we only use the ciphers we want, `ssl_prefer_server_ciphers` is turned on. Finally, `ssl_ciphers` specifies the list of ciphers that we are OK with -- along with a handful of conditions that we explicitly want to exclude (`!aNULL` to refuse ciphers without authentication, `!MD5` to refuse ciphers with MD5, and so on).

### Stricter Security with HSTS

HTTPS is great, but there are a lot of tiny things than can coerce a browser to fall back to plain-text HTTP. An outdated anchor, a stubborn browser cache, and a nefarious third party are all potential culprits.

Luckily, modern browsers have adopted a standard which allows the server to tell browsers whether or not all web traffic should be done over a secure connection.

This standard, [HTTP Strict Transport Security](https://tools.ietf.org/html/rfc6797) (HSTS), is a simple header that a server provides every time a client makes a request. The header indicates for how long a browser should unconditionally refuse to take part in unsecured HTTP connection for a specific domain.

If you are prepared to guarantee that your server should be available over HTTPS *and only HTTPS* indefinitely, the following header will enforce HSTS for modern browsers:

~~~
add_header Strict-Transport-Security max-age=31536000;
~~~

However, it is recommended you start out with a much smaller `max-age`, in case things don't work out or a misconfiguration wreaks havoc. Perhaps just 24 hours:

~~~
add_header Strict-Transport-Security max-age=24;
~~~

Once you're comfortable with the idea of your site being HTTPS-only, you can bump this up to a few months or a year.

Security is a neverending process, so it is important to stay aware of and prepared to handle any change in the effectiveness of a cipher.
