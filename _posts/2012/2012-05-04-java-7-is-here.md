---
layout: post
title: Java 7 is Here (and has been for a while…)
date: 2012-05-04 12:00:00 -0500
description: Writing because people are fighting the change...
tags: [java]
---
Ok, what is the deal with folks actively not wanting to upgrade to Java 1.7?

I understand the small, but growing segment of society that are on Mac OS that don’t really have options until Apple 
throws some more resources into the OpenJDK development. I can also understand if there are system or contractual 
requirements for keeping yourself compatible with older versions of Java. However, my question is targeted towards 
folks who don’t have these excuses, but are just

For example, just recently dealing with a Linux platform guy who complained about having to upgrade. Linux/Unix is 
unequivocally the best supported platform for Java (one of the few advantages it has. Thank god for VMs). The stuff 
I had written was written to JDK 7, since the Java support is ending for Java 1.6 soonish (it was extended, but still). 
He wanted me to write my stuff to not include my Java libraries, rather than install the new JDK. Seriously? Seriously.

I wish he was the only one that had come up with. This has been coming up across the board. Plenty of customers 
having been pushing back for no reason (though they are going to have to do it anyways). If you look at some of the 
statistics on newer users (on sites like BlueJ or GreenFoot, people learning Java aren’t even downloading the newest 
versions. That’s just ridiculous.

For anyone out there that is a Java developer at this point. You should have installed JDK 1.7 already. I understand 
if you have to include

```bash
-target
```

flags on your compiler to make it compatible with older versions, but you should still have the newest versions. 
Also, you should know what the new version contains. If you aren’t, for example, taking advantage of the new nio 
libraries, you are wasting your time on bad code. This stuff makes the Apache commons I/O stuff look insignificant 
and brings it closer to the scripting languages like Perl, Python, or Groovy. Not to mention how much better JDK 
works with Groovy, Scala, and Clojure.

This is really just a plead to developers to not get stuck in your sedentary ways. Just upgrade already.