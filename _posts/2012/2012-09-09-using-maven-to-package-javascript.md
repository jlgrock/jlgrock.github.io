---
layout: post
title: How to use Maven to package a JavaScript Dependency
date: 2012-09-09 12:00:00 -0500
description: Using maven to package javascript dependencies
tags: [maven, javascript]
---

Hopefully, the [article](/2012/2012-09-09-using-a-maven-javascript-dependency) about using JavaScript 
libraries should have swayed you should use Maven or some other repository to disseminate your libraries. But now 
you’ve hit a point that you have found a library that doesn’t exists in any Maven Repository (at least not ones 
that you have access to). What to do now? No worries. Publishing an artifact is easy.

First, assuming your code is in the location `${basedir}/src/main/javascript`, create a file in `${basedir}/src/main/assermbly` called `assembly.xml`. This file should contain the following:
```xml
<assembly>
  <id>bin</id>
  <formats>
    <format>tar.gz</format>
    <format>tar.bz2</format>
    <format>zip</format>
  </formats>
  <fileSets>
    <fileSet>
      <directory>${basedir}/src/main/javascript</directory>
      <includes>  
        <include>*</include>
      </includes>
    </fileSet>
  </fileSets>
</assembly>      
```

This file will tell the assembly plugin how to package (into a zip, gzip-tarball, and bzip2-tarball) and what to include (“*”, or everything – you can include only specific things or exclude specific things. Please see the Assembly Plugin for more information about configuring includes/excludes).

Next, you need to tell maven to execute the Assembly plugin. Do this by adding the following to your pom.xml:
```xml
<dependency>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-assembly-plugin</artifactId>
  <version>${maven.assembly-plugin.version}</version>
  <executions>
    <execution>      
      <id>package-closure</id>
      <phase>package</phase>
      <goals>
        <goal>single</goal>
      </goals>
      <configuration>      
        <descriptor>${basedir}/src/main/assermbly/assembly.xml</descriptor>
        <attach>true</attach>
        <appendAssemblyId>false</appendAssemblyId>
      </configuration>    
    </execution>
  </executions>
</dependency>
```

What if the code isn’t yours, though? OK, now we are in a strange place. First, make sure that the licensing allows you 
to republish this if you are publishing this somewhere public. If it is 
[Apache 2](https://opensource.org/licenses/Apache-2.0), 
[GPL](https://opensource.org/licenses/gpl-license) or 
[LGPL](https://opensource.org/licenses/lgpl-license), you won’t have an issue republishing it unmodified. But check 
to be sure.  After that, it gets way more complex. I'd suggest a private maven repository so that you aren't 
distributing others code.

First, you need to download the code from the external repository. The following is code that will download Google’s 
Closure JavaScript library. This uses the SCM plugin. This is the same plugin that acts on your code in your SCM 
section, allowing you to do mvn scm commands. Why don't we put it in the SCM section? Well, cause now we know that 
your code will live in a different place than the SCM plugin. So you are going to need to fill out the SCM section 
with *your* SCM details.

```xml
<dependency>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-scm-plugin</artifactId>
  <version>${maven.scm-plugin.version}</version>
  <executions>
    <execution>
      <id>checkout</id>
      <phase>generate-resources</phase>
      <configuration>
        <checkoutDirectory>${project.build.directory}/checkout</checkoutDirectory>
        <connectionType>connection</connectionType>
        <developerConnectionUrl>scm:svn:http://closure-library.googlecode.com/svn/trunk/</developerConnectionUrl>
        <connectionUrl>scm:svn:http://closure-library.googlecode.com/svn/trunk/</connectionUrl>
      </configuration>
    </execution>
  </executions>
</dependency>
```

Ok, that will have downloaded this into your target/checkout folder. Now, jut make a quick tweak to what we’ve already 
done. Change the directory that the assembly.xml is pointing at to `${project.build.directory}/checkout`

And Voila! Now, if you just use the Maven release plugin or follow standard deployment procedures, this will be 
released for everyone in your company (or in the world, depending on where you are publishing to)!
