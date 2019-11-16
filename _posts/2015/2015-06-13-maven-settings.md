---
layout: post
title: Maven Settings
date: 2015-06-13 12:00:00 -0500
description: Maven Settings
tags: [maven]
---

So there are so many settings that get set before running a Maven build that it gets crazy.  There was a [Confluence wiki](https://www.atlassian.com/software/confluence) that I used as part of [Codehause](http://www.codehaus.org/) (before they closed their doors) that I referenced a bunch when I was doing hard-core Maven plugin development that was extremely helpful.  You see, there are a bunch of ways that you can get the maven properties, but each of them requires setting up something in your project or running some odd command - but all I want is a simple reference.  So, I looked at this confluence site (which can still be found here, at least for the short term future) and compiled a list of very useful properties that everyone should have at their fingertips.  That way, whether you are setting up a project or doing plugin development, you can hit this reference.

## Understanding Where The Properties Come From
First though, I'd like to cover the several ways that these properties are set.  Some are clear, some are not so much.

Maven loads up the XML files into Java Objects, and provides them for Maven plugins and the developer to use.  These XML files include pom.xml files, parent pom.xml files, as well as the settings.xml (and occasionally security-settings.xml, but I won't cover that too much here).  The hierarchy can be a bit hard to follow for the uninitiated, but remember that all properties are resolved and then inherited (IN THAT ORDER) and the inheritance works in the way that pom.xml > parent pom.xml > settings.xml.  Or, a better way to think of it is that the most specific one wins.  Also, just in case it wasn't clear, this is all case-sensitive, so "MyProgram" and "myprogram" are two separate variables.

When you want to access a variable, you just use the [Ant](http://ant.apache.org/) model of variable replacement, which is the following: "${var_name}".  This will evaluate the var_name and resolve it as part of your maven build.

## The Properties Section of the Pom

Any tag that you put into the properties section of the pom.xml becomes a variable that can be used anywhere and inherits throughout a multi-module project.  This is the easiest way to put a property in for reuse.  I don't have any way to show reference documentation for these though, as you could literally create any variable that you want.

## Environment Variables
Since Maven needs to know what the environment variables are, it parses them in from your terminal as well and puts them into an Object array, which can be accessed within the pom as well.  It uses the collection "env".  So, if you needed to access an environment variable called "JAVA_HOME" then you use the variable `${env.JAVA_HOME}`.  Similarly, if you need the environment variable M2_HOME, you use the `${env.M2_HOME}`

## OS and User Setting Variables
Since Maven is multiplatform, in a way that other build tools are not.  But, if you ever need to know something about the operating system, these bad boys are useful.  For example, you can [use them in profiles](http://maven.apache.org/guides/introduction/introduction-to-profiles.html) to run extra functionality on certain Operating Systems to make sure that it runs on all systems.  Tools like [Docker](https://www.docker.com/) and [Vagrant](https://www.vagrantup.com/) are working to make the machine that you deploy to a constant, but that doesn't stop the constant flow of [BYOD](http://www.techradar.com/us/news/computing/what-is-byod-and-why-is-it-important--1175088) that any good team will likely have.

[table id=4 /]
## Project Properties
Once Maven has loaded itself into memory and parsed its settings and your XML into Java Objects, you can access them.  Most of these properties can be accessed via reflection against the accessor (a.k.a. "getter") methods.  You do this using a transformative dot notation.  For example the variable project.x.y.z translates to project.getX().getY().getZ();  (via reflection).  Many of these methods align directly with your pom.xml, so you can reference the project object and get the group and version with project.group and project.version, respectively.

So, the best way to know what properties can be accessed is via the objects themselves, and thus knowing the Maven API.  Which is great, but let's get a bit realistic.  To build your project, you shouldn't need to know the API of the build tool.  Maven should have a reference, or a way to print out the properties.  But it doesn't.  So here's a simple reference for maven pom objects:

[table id=1 /]
## Build Properties
Although technically, this is still part of the project, it is a subproject that is edited very often.  Plus it is, logically, a very different part of the pom than anything else and I think it deserved its own section.

[table id=2 /]
## Java Properties
Since Maven is build with and runs on Java, plus it has become the [most widely used Java build tool](http://zeroturnaround.com/rebellabs/java-build-tools-part-2-a-decision-makers-comparison-of-maven-gradle-and-ant-ivy/) (though I hope that something like [Gradle](http://gradle.org/) ends up taking that throne eventually), it makes a lot of sense that they include a lot of Java information for use and for debugging.

[table id=3 /]

