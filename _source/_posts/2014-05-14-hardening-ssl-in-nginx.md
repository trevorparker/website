---
title: Hardening SSL in Nginx
date: '2014-05-14T11:25:29+00:00'
tags:
  - nginx
  - apache
  - ssl
  - tls
  - ciphers
  - hsts
  - security
  - logjam
layout: post
summary: A starting point for hardening SSL on an Nginx web server.
---

Securing your site's web traffic with SSL is more than just slapping an SSL certificate on your server. Times have changed. Things have gotten more nuanced as browsers have aged, ciphers have weakened, and attackers have gotten more creative.

For starters, you'll want to choose a set of ciphers that provide a high assurance of security without neglecting visitors on older browsers.

<!-- e -->
<span id="more"></span>

### Stronger Ciphers

Ciphers make encryption and message authentication work. If a cipher is determined to be weak or vulnerable to attack, its usefulness is instantly degraded. Unfortunately a balance has to be maintained between the set of ciphers that are still good enough to be useful and the set of ciphers that are supported by your visitor's browsers.


At the time of writing, the following [Nginx](http://nginx.org/) configuration is what is used on this site, and achieves an A+ rating on the [Qualys SSL Labs test](https://www.ssllabs.com/ssltest/index.html):

~~~
ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
ssl_prefer_server_ciphers on;
ssl_ciphers DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:kEDH+AESGCM:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:AES:CAMELLIA:DES-CBC3-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!aECDH:!EDH-DSS-DES-CBC3-SHA:!EDH-RSA-DES-CBC3-SHA:!KRB5-DES-CBC3-SHA;
ssl_session_timeout 5m;
ssl_session_cache shared:SSL:10m;

ssl_dhparam /path/to/dhparams.pem
~~~

{: .arrow-for-more}
[View my current Nginx configuration for this site on GitHub](https://github.com/trevorparker/nginx-configs/blob/master/trevorparker.com).

The most important bits here are the `ssl_protocols`, `ssl_prefer_server_ciphers`, `ssl_ciphers`, and `ssl_dhparam` lines.

We snuff out older SSL versions with the `ssl_protocols` line. To help ensure that the browser we only use the ciphers we want, `ssl_prefer_server_ciphers` is turned on. Finally, `ssl_ciphers` specifies the list of ciphers that we are OK with -- along with a handful of conditions that we explicitly want to exclude (`!aNULL` to refuse ciphers without authentication, `!MD5` to refuse ciphers with MD5, and so on).

#### The Logjam Attack

The last bit, `ssl_dhparam`, is due to an attack against the Diffie-Hellman key exchange, a critical part of setting up TLS sessions. Unfortunately, many services employing TLS used the same set of prime numbers, which resulted in what is known as the [Logjam attack](https://weakdh.org), as described in [this report](https://weakdh.org/imperfect-forward-secrecy.pdf). So, we also need to ensure that we're not using older export-grade crypto, and we need to generate our own Diffie-Hellman group:

~~~
openssl dhparam -out /path/to/dhparams.pem 2048
~~~

Replace `/path/to/dhparams.pem` in this command, and in your Nginx config, with a path of your choosing.

### Stricter Security with HSTS

HTTPS is great, but there are a lot of tiny things than can coerce a browser to fall back to plain-text HTTP. An outdated anchor, a stubborn browser cache, and a nefarious third party are all potential culprits.

Luckily, modern browsers have adopted a standard which allows the server to tell browsers whether or not all web traffic should be done over a secure connection.

This standard, [HTTP Strict Transport Security](https://tools.ietf.org/html/rfc6797) (HSTS), is a simple header that a server provides every time a client makes a request. The header indicates for how long a browser should unconditionally refuse to take part in unsecured HTTP connection for a specific domain.

If you are prepared to guarantee that your server should be available over HTTPS *and only HTTPS* indefinitely, the following Nginx directive will enforce HSTS for modern browsers:

~~~
add_header Strict-Transport-Security max-age=31536000;
~~~

However, it is recommended you start out with a much smaller `max-age`, in case things don't work out or a misconfiguration wreaks havoc. Perhaps just 24 hours:

~~~
add_header Strict-Transport-Security max-age=86400;
~~~

Once you're comfortable with the idea of your site being HTTPS-only, you can bump this up to a few months or a year.

### Apache and Other Web Servers

Most of the configuration options described here can be easily translated to Apache and other modern web servers. For instance, here's Apache's flavor of the SSL cipher configuration described above:

~~~
SSLProtocol all -SSLv2 -SSLv3
SSLHonorCipherOrder on
SSLCipherSuite DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:kEDH+AESGCM:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:AES:CAMELLIA:DES-CBC3-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!aECDH:!EDH-DSS-DES-CBC3-SHA:!EDH-RSA-DES-CBC3-SHA:!KRB5-DES-CBC3-SHA
~~~

And, to require HSTS for Apache (you may need to enable `mod_headers`):

~~~
Header set Strict-Transport-Security "max-age=31536000;"
~~~

Security is a neverending process, so it is important to stay aware of and prepared to handle any change in the effectiveness of a cipher. Keeping an eye on resources such as [Mozilla's Recommended Ciphersuites](https://wiki.mozilla.org/Security/Server_Side_TLS#Recommended_Ciphersuite) and [SSL/TLS Deployment Best Practices by Qualys SSL Labs](https://www.ssllabs.com/projects/best-practices/) is a good place to start.

**Updated May 22, 2015**: Instructions for generating a unique Diffie-Hellman group have been added, as a result of the [Logjam attack](https://weakdh.org).

**Updated December 20**: The preferred ciphers and their order more closely match Mozilla's recommendations, with the exception of preferring DHE over ECDHE. Additionally, the Nginx built-in SSL session cache as been disabled for performance reasons.

**Updated December 15**: SSL Labs has now capped the maximum score of any server that supports RC4 to B as part of their [end of year updates](https://community.qualys.com/blogs/securitylabs/2014/12/08/ssl-labs-end-of-year-2014-updates). In that vein, this guide now suggests disallowing ciphers that use RC4 by removing any preferred RC4 ciphers and adding RC4 to the exclusion list.

**Updated October 14**: The recommended SSL protocols were revised to remove SSLv3 in light of the [POODLE exploit](http://googleonlinesecurity.blogspot.com/2014/10/this-poodle-bites-exploiting-ssl-30.html).

