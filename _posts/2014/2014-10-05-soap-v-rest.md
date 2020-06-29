---
layout: post
title: SOAP vs REST - Understanding the Underlying Differences
date: 2014-10-05 12:00:00 -0500
description: SOAP vs REST - Understanding the Underlying Differences
img: 2014/internet20081-e1437511408930.jpg
tags: [research]
---

I’ve never used [Simple Object Access Protocol (SOAP)](http://en.wikipedia.org/wiki/SOAP), because, since I’ve been a
developer, I’ve always been involved in projects using 
[Representative State Transfer (REST)](http://en.wikipedia.org/wiki/Representational_state_transfer) services. 
Turns out, this wasn’t as simple of a question as I’d hoped.  Also, it seems that it’s not an old protocol that nobody
should use.  It actually has plenty of good uses and a bunch of solid tools too.

# SOAP
* Supports multiple data formats, but usually XML-based messaging is used for strict schema design.
* The protocol has a bit of overhead for hand shaking (even if the Message Transmission Optimization Mechanism reduces
the message sizes significantly.)
* Can be implemented over any transport layer (HTTP, SMTP, JMS, etc)
* Requires Web Services Description Language (WSDL), which can be used in proxies/caches.  This defines interfaces of
services and must be shared with whomever might be accessing your application
* Reliable - Retries are handled for you as part of the framework overhead
* All parts of the communication can be encrypted (even parameters)
* Strongly typed
* Extra security can be built in (WS-Security)
* Atomic operations can be built in.  More than just transactions.
* Methodology: Exposes operations that can be done
* The core APIs on the JVM is JAX-WS
* Popular Java implementations include [AXIS](https://axis.apache.org/axis2/java/core/docs/jaxws-guide.html),
[CXF](http://cxf.apache.org/docs/jax-ws.html), and [Spring-WS](http://projects.spring.io/spring-ws/)

# REST
* Supports multiple data formats - The most popular is JSON, but it also supports many other known types.  With JSON,
it tends to allow for human readable results.
* Considered to be a more lightweight solution - especially on the front end.  Easy to build, no toolkits required.
Though, it is still easier to access with libraries.
* Implemented directly on top of HTTP
* Emphasis on stateless communication - with the exception of POST/PATCH HTTP operations.  All others are
[idempotent](http://restcookbook.com/HTTP%20Methods/idempotency/) (can be repeated without repercussions - for example,
if you are cacheing responses).
* Proxies/Caches need a custom solution
* Not strongly typed.
* Supports transactions, but not atomic operations
* Not reliable - retries have to be handled by application
* Methodology: Exposes resources, which represent data, and actions that can be done upon them
* The core APIs on the JVM is JAX-RS
* Popular Java implementations include [CXF](http://cxf.apache.org/docs/jax-ws.html),
[Jersey](https://jersey.java.net/), [RESTEasy](http://resteasy.jboss.org/), and
[Spring-MVC](https://docs.spring.io/spring/docs/current/spring-framework-reference/web.html).

# Summary:

So, looking at these, your architectural decisions should be based on the strengths of each protocol.  Actually, you
don’t even need to use just one, you could use both.  In summary:

**REST** = good for Web services, limited bandwidth/resources, and combining content from many different sources in
a web browser

**SOAP** = good for Enterprise services with an abundance of processing power - includes high reliability,
transactions, security built in, asynchronous processing, and contract first development.  Also, the strict schema
makes is very good for passing around a lot of data.

99% of the time, I’m going to suggest REST as a protocol, especially since most of my work is web facing products only.
However,  now that I know a bit more about SOAP and how servers can use them for communications, I know what to do
during the other 1% of the time.

Further reading material:

[Makeup of SOAP](http://spf13.com/post/soap-vs-rest) - a comparison

[Video Introduction to SOAP](https://www.youtube.com/playlist?list=PLqq-6Pq4lTTZTYpk_1DOowOGWJMIH5T39)

