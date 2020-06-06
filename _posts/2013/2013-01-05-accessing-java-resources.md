---
layout: post
title: Accessing Java Resources (a.k.a. getResource vs getSystemResource)
date: 2013-01-05 12:00:00 -0500
description: Java Resources
tags: [java]
---

This isn't a tough article, but one that I always forget and have to look up. This is useful for everyone who has to 
touch Java for the first time or experienced users who just forget (like me).

Adding a resource, especially when using a build tool Maven, is quite easy. You just include it in the jar (which in 
maven, is by putting it in `${projectdir}/src/main/resources)`. Getting it back out is a little trickier, but not 
too bad.

The easiest way to access this is to use the <code>getResource</code> instead of `getSystemResource`, which are on the 
Java Class Loader, to use a resource specific to a given classloader instead of the system. For example, try any of the
following:

```java
URL resource = getClass().getClassLoader().getResource("R.txt");
URL resource = Foo.class.getClassLoader().getResource("R.txt");
URL resource = getClass().getResource("/R.txt");
URL resource = Foo.class.getResource("/R.txt");
```

Note the leading slash when calling `Class.getResource()` instead of `ClassLoader.getResource()`. `Class.getResource` 
is relative to the package containing the class unless you have a leading slash, whereas `ClassLoader.getResource()` 
is always absolute.

Also, as a side-note, if you are trying to access resources from a dependency, don't. You are doing it wrong. This is 
possible, but bad design and hard to implement.
