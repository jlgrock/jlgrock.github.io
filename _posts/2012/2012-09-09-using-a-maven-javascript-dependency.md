---
layout: post
title: Using a Maven Javascript Dependency
date: 2012-09-09 12:00:00 -0500
description: Using javascript dependencies from others
tags: [maven, javascript]
---

Using a [Maven Repository](https://www.sonatype.com/nexus-repository-oss) to handle your dependencies is just a good 
idea. This is what it does best. Due to the central repository idea, many other build tools have copied it. Arguably, 
some would say they have improved upon it as well, but the idea is the same. 
[Ivy](http://ant.apache.org/ivy/) (for [Ant](http://ant.apache.org/)) , [Buildr](http://buildr.apache.org/), and 
[Gradle](http://www.gradle.org/), for example, use the same artifacts that Maven does. 
[Node Package Modules (npm)](https://npmjs.org/) is another form for direct JavaScript inclusion, though it requires 
that you are tied into Node.js. It’s probably a good idea to publish to npm as well for a JavaScript dependency, but 
I’ll have to post another article on that later.

So if you take away anything, it is that setting up a standard for your dependency is a good idea. It allows people to 
easily just add a couple of lines and they are using your library without a problem. The reasons are these:

You are able to guarantee that no one has gone in and fiddled with the library that you’ve downloaded (yes – it has 
happened to me in production, which causes a licensing nightmare for some products, especially if the Junior developer 
wasn’t smart enough to know that you can’t just change someone else’s files without adjusting the licenses.)
Design by extension is the correct way to develop anyways. If you want to change their code, take a class that they 
are using and wrap it to do what you want. That way, when the version changes and you upgrade, you still have the 
changes. Looking at #1 – if one developer has made this change and then the team is required to upgrade the 
library, things will start breaking and you won’t know why.
So most people will be with me at this point, but if you ask them how to do it, they are now going to stop and say 
“Wait… isn’t Maven for Java?” My response is a simple “No.” It was built originally with Java in mind, and has heavy 
adoptance in the Java world and the plugins are written in Java, but Maven itself is actually language agnostic. For 
example, if you want to use Maven for C/C++, I would suggest using the 
[Nar Plugin](http://duns.github.com/maven-nar-plugin/) or if you want to use like to use 
[Google’s Closure Tools](https://developers.google.com/closure/), I suggest using the 
[Closure JavaScriptFramework](https://github.com/jlgrock/ClosureJavascriptFramework) or if you want to compile with 
Dalvik down to and [Android app](http://developer.android.com/design/index.html), you can use the 
[Maven Android plugin](http://code.google.com/p/maven-android-plugin/). You get the general idea. It can handle 
quite a bit, once you know what you are doing.

So, in this example, I’m going to use [Dojo](http://dojotoolkit.org/) in my development (since they have done 
a really good job of publishing to Maven Central, and it’s a great open source JavaScript Library – eat it 
[Sencha](http://www.sencha.com/), with your ridiculous Developer’s license). To include it as part of my build, 
just add the code below. Feel free to change any of the variables to be whatever you need (especially in the 
outputDirectory tag):

```xml
  <dependency>
    <groupId>org.apache.maven.plugins</groupId>
	<artifactId>maven-dependency-plugin</artifactId>
	<executions>
	  <execution>
        <id>unpack dojo</id>
        <phase>generate-sources</phase>
        <goals>
          <goal>unpack</goal>
        </goals>
        <configuration>
          <artifactItems>
            <artifactItem>
              <groupId>org.dojotoolkit</groupId>
              <artifactId>dojo</artifactId>
              <version>${dojo.version}</version>
              <type>zip</type>
              <overWrite>true</overWrite>
              <outputDirectory>${project.build.directory}${my.outputDir}</outputDirectory>
            </artifactItem>
          </artifactItems>
        </configuration>
      </execution>
    </executions>
  </dependency>
```

This will download the zip file (note the type tag with a value of “zip”) and unpack it using the maven dependency 
plugin to the location specified in the value of the output tag.

That’s it! Now don’t you feel silly for having not done this before?
