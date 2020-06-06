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

Maven loads up the XML files into Java Objects, and provides them for Maven plugins and the developer to use.  These 
XML files include pom.xml files, parent pom.xml files, as well as the settings.xml (and occasionally 
security-settings.xml, but I won't cover that too much here).  The hierarchy can be a bit hard to follow for the 
uninitiated, but remember that all properties are resolved and then inherited (IN THAT ORDER) and the inheritance 
works in the way that pom.xml > parent pom.xml > settings.xml.  Or, a better way to think of it is that the most 
specific one wins.  Also, just in case it wasn't clear, this is all case-sensitive, so "MyProgram" and "myprogram" are 
two separate variables.

When you want to access a variable, you just use the [Ant](http://ant.apache.org/) model of variable replacement, 
which is the following: `${var_name}`.  This will evaluate the var_name and resolve it as part of your maven build.

## The Properties Section of the Pom

Any tag that you put into the properties section of the pom.xml becomes a variable that can be used anywhere and 
inherits throughout a multi-module project.  This is the easiest way to put a property in for reuse.  I don't have 
any way to show reference documentation for these though, as you could literally create any variable that you want.

## Environment Variables
Since Maven needs to know what the environment variables are, it parses them in from your terminal as well and puts 
them into an Object array, which can be accessed within the pom as well.  It uses the collection "env".  So, if you 
needed to access an environment variable called "JAVA_HOME" then you use the variable `${env.JAVA_HOME}`.  Similarly, 
if you need the environment variable M2_HOME, you use the `${env.M2_HOME}`

## OS and User Setting Variables
Since Maven is multiplatform, in a way that other build tools are not.  But, if you ever need to know something about 
the operating system, these bad boys are useful.  For example, you can 
[use them in profiles](http://maven.apache.org/guides/introduction/introduction-to-profiles.html) to run extra 
functionality on certain Operating Systems to make sure that it runs on all systems.  Tools like 
[Docker](https://www.docker.com/) and [Vagrant](https://www.vagrantup.com/) are working to make the machine that you 
deploy to a constant, but that doesn't stop the constant flow of 
[BYOD](http://www.techradar.com/us/news/computing/what-is-byod-and-why-is-it-important--1175088) that any good team 
will likely have.

| Property Name	| Description	|
| ------------- | ------------- |
| user.country	| The country of the users computer, in international 2-digit codes, such as "US". |	
| user.dir | The absolute path to the directory that you currently are executing from. |	
| user.home | The home directory operating system setting for the user. On windows, this would be something like "C:\Users\jlgrock". |	
| user.language | the 2-digit code for the language. An example would be "en" |	
| user.name | The username that you are using in this Operating System. For example, mine is "jlgrock" |
| user.timezone | The timezone that your OS is set to. An example is "America/New_York" |
| line.separator | The Line separator that your OS uses. On Linux, this is "\n". |	
| file.separator | The separator that is used for breaking up directories and files in a path. An example would be "/" for Linux. I would suggest avoiding to use this in the pom.xml, as paths should be set relatively, and the file separator (which is either "/" or "\") will be figured out by Maven. It's smart enough. |
| path.separator | The separator for separating the protocol from the path. In standard URI form, this is "\:" |
| file.encoding | The standard encoding of the OS. For example, this may be "UTF-8" |
| file.encoding | pkg	The package that does the encoding. The standard Java install will use "sun.io" |
| os.name | The name of the Operating System, such as "Mac OS X" |
| os.arch | The architecture that you are running on. For example, this might be something like "x86_64" |
| os.version | The version of the operating system that you are running, such as "10.17.4" |

## Project Properties
Once Maven has loaded itself into memory and parsed its settings and your XML into Java Objects, you can access them.  
Most of these properties can be accessed via reflection against the accessor (a.k.a. "getter") methods.  You do this 
using a transformative dot notation.  For example the variable project.x.y.z translates to project.getX().getY().getZ();  
(via reflection).  Many of these methods align directly with your pom.xml, so you can reference the project object and 
get the group and version with project.group and project.version, respectively.

So, the best way to know what properties can be accessed is via the objects themselves, and thus knowing the Maven 
API.  Which is great, but let's get a bit realistic.  To build your project, you shouldn't need to know the API of the 
build tool.  Maven should have a reference, or a way to print out the properties.  But it doesn't.  So here's a simple 
reference for maven pom objects:

| Property Name | Description |
| ------------- | ------------|
| project.name | The name of your project, as you have entered it in the "name" tag |	
| project.groupId | The groupId of your project, as you have entered it in the "groupId" tag. I use this constantly in multi-module projects, as I will set all submodule dependencies to use the same ${project.groupId}. |
| project.version | The version of your project, as you have entered it in the "version" tag. As this is well used, I will note that this specifically will relate to the current pom.xml, so if the version of the current pom.xml differs from the parent, you need to access the project.parent object. I use this constantly in multi-module projects, as I will set all submodule dependencies to use the same ${project.version} |
| project.packaging | The packaging of your project, as you have entered it in the "packaging" tag. If you don't specify this, it will default to "pom" |		
| project.description | The description of your project, as you have entered it in the "description" tag |
| project.artifactId | The artifactId of your project, as you have entered it in the "artifactId" tag. This one is useful if you want to use a plugin to write the output of the artifactId (plus version and whatever other information) to some form of documentation. |	
| project.file | The Java File related to the pom.xml. You can then use the reflection to access file properties as well |	
| project.artifacts | This is a collection of the output artifacts that are created when doing a Maven build. These include the jar, source jar, documentation jar, pom files, etc. |
| project.parent | Essentially calling this.getParent() in Java, this allows you to access all of the parent objects properties, just like the properties that are at this object. For example you can access the artifactId from the parent object using the property ${parent.artifactId}. |
| project.parentArtifact | Maven needed a hook to the actual pom output of the parent. I rarely use it, but it can come in handy |
| project.pluginArtifacts | |
| project.remoteArtifactRepositories  | |
| project.pluginArtifactRepositories  | |
| project.attachedArtifact  | |

## Build Properties
Although technically, this is still part of the project, it is a subproject that is edited very often.  Plus it is, 
logically, a very different part of the pom than anything else and I think it deserved its own section.

| Property Name | Description |
| ------------- | ----------- |
| project.build.directory | The directory that your build artifacts will be placed. By default, this is {location of pom.xml}. This is extremely useful in getting relative positioning from your pom.xml. For example, if writing a plugin, and you want to create a maven plugin that uses ArnoldC, you'll want to have to plugin automatically use "${project.build.directory}/src/main/arnoldc/" to match Maven conventions |
| project.build.outputDirectory | The directory that your build artifacts will be placed. By default, this is {location of pom.xml}/target, however this can be configured in the pom.xml (in the build section, obviously) |
| project.build.sourceDirectory | The directory that your source code will be pulled from. By default, this is {location of pom.xml}/src/main/java, however this can be configured in the pom.xml (in the build section, obviously) |
| project.build.sourceEncoding | How you want to encode your output files. By default this is UTF-8 (Java's standard). I don't suggest changing this unless you know what you are doing |
| project.build.testOutputDirectory | Similar to the outputDir counterpart |
| project.build.testSourceDirectory | Similar to the sourceDir counterpart |

## Java Properties
Since Maven is build with and runs on Java, plus it has become the 
[most widely used Java build tool](http://zeroturnaround.com/rebellabs/java-build-tools-part-2-a-decision-makers-comparison-of-maven-gradle-and-ant-ivy/) 
(though I hope that something like [Gradle](http://gradle.org/) ends up taking that throne eventually), it makes a lot 
of sense that they include a lot of Java information for use and for debugging.

| Property Name | Description |
| ------------- | ----------- |
| java.class.path | A single path object. The classpath is what java is using for maven to find jars and classes. Please note that Maven will fork your process, so to add classpaths to something being executed within Maven is a whole different process |
| java.class.version | The major/minor version used to encode your class files within the Java Platform. For example JDK 1.8 uses "52.0" |
| java.endorsed.dirs | 	java.vendor.url.bug	The url to report bugs, such as "http\://bugreport.sun.com/bugreport/" |
| java.ext.dirs | A semi-colon delimited list of paths where your Java platform extensions are stored |
| java.home	The JAVA_HOME | variable that is set in the environment variables (and is required by Maven) |	
| java.io.tmpdir | The path that java is using to store temporary files currently |
| java.library.path | A semi-colon delimited list of paths where your Java platform libraries are stored.	java.vm.specification.name	The name of the specification that the VM matches. Something like "Java Virtual Machine Specification" |
| java.runtime.name | The name of the runtime environment installed locally. This should be something like "Java(TM) SE Runtime Environment" |
| java.runtime.version | The specific version of the java runtime that you are using. Helpful if you know that there are bugs in certain versions that you don't work with. Resolves to something like "1.8.0_45-b17" |
| java.specification.name | The name of the specification that the java platform matches. This should be "Java Platform API Specification" |
| java.specification.vendor | The vendor that created the specification that your platform implementation matches, would be something like "Oracle Corporation" |
| java.specification.version | The version of the specification that your version of java platform matches. Something like "1.8" |
| java.vendor	The name | of the vendor that created your Java installation, such as "Oracle Corporation" |
| java.vendor.url | The url of the JVM, which would be something like "http\://java.oracle.com/" |
| java.version	The version | of Java. This should be something like "1.8.0_55" |
| java.vm.info | | 
| java.vm.name | The name of the implementation of the Virtual Machine. This is something like "Java HotSpot(TM) 64-Bit Server VM". This comes in helpful if you know that certain VMs cause issues for you |
| java.vm.specification | vendor	The vendor that wrote the specification - and example being "Oracle Corporation" |
| java.vm.specification | version	The version of the Specification that this VM matches. This should be something like "1.8" |
| java.vm.vendor | The vendor that makes your specific VM. This should be something like "Oracle Corporation" |
| java.vm.version | The version of the virtual machine. This should be something like "25.25-b02" |
