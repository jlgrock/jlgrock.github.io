---
layout: post
title: Making the Maven Version and Subversion Version Match
date: 2012-09-13 12:00:00 -0500
description: working with two different version control systems is painful.  Here's a way to do it, if you have to.
tags: [maven, git, svn]
---

Let me start this out – this is strongly discouraged. Not only by me, but by Maven and any standards that you will ever come across. Your release version should almost never be your SCM version. <a href="”">Some tools</a> allow you to pull in the SCM version as a variable and use it as a maven variable. This is great, because you can inject it into places to tie your release version to your project. Note the difference. I even wrote a great article about injecting variables into WAR files <a href="http://jlgrock.xtreemhost.com/?p=15">here</a> and you can use the [buildnumber plugin](https://www.mojohaus.org/buildnumber-maven-plugin/) to inject your build numbers!

But, some groups (we’ll just nickname them “Oogle” for now) are being annoying and don’t want to do full blown releases, as that might mean that they have to support old releases. I totally understand that principle, so I’m not going to knock it. But, if you don’t have a release, how does one differentiate between versions?

Well, at this mythical company Oogle, they have stated you should use their subversion revision as the way to refer to their releases. Well, we can do that, but God help us if you switch to Git or some other form of DVCS. One thing about release numbers is that they should be sequential, so that you know which version precedes another, and human readable. In many of the new DVCS flavors, they use the SHA-1 hash, which is some long string of numbers and letters that is not sequential, nor human readable. But, for now, we can work with Subversion.<!--more-->

So, now we have a predicament. We need to do something that Maven strongly discourages (and can’t really work with by itself – it needs to know the version, so no variables are allowed in the project version tag). Thinking about this, we could run two maven pom files. One to set the version in the second pom file, and the other does the release. Problem is when you are working with Continuous Integration. Many of the CI servers (Hudson, Jenkins, etc.) expect one pom file to be executed for a release. Hudson/Jenkins can execute an ant command followed by a maven command though… It’s getting sticky.

Rather than you following me down the rabbit hole, let me just show you the solution that I’ve come up with.

First, create a template pom file. This will overwrite your pom.xml every time the build.xml is run.
{% highlight xml %}
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<groupId>com.github.jlgrock</groupId>
	<artifactId>myId</artifactId>
	<version>@SVN_VERSION@</version>
	<packaging>pom</packaging>
…
{% endhighlight %}
Next, create an Ant Script as `build.xml` at the root level of your maven project.
{% highlight xml %}

	
    	This will replace the version number in the maven file with the current revision 
		within Subversion.  This requires a machine with a c-shell and subversion installed.
    

	http://whatever.my.com/server/address/is/

	
		
			
				
			
		
	

	
		
			
			
		
	


{% endhighlight %}
OK, what does this do? The svnInfo goal (btw – I think this only works on linux-style machines) will execute, via c-shell, a command to query the server for svn info. This will return a large block of text, of which, we only need a small amount of text. So, we pass this through to the grep command, followed by the awk command. The result of the grep command will be something like `Revision: 4233` and the result of the awk command should be something like `4233`. You can test this locally if you want to see each of those in action.

Next, it takes that value and shoves it into a variable (`${build.version}`). Then, it does a copy of the template file, searching through the template file, where I have no version but have put `@SVN_VERSION@` as a placeholder. It replaces the string `@SVN_VERSION@` with `4233-SNAPSHOT`.

OK, next we have to create the pom-template that it can work on.

Now the Continuous Integration environment can execute the release plugin on the Maven pom and the release version will match the subversion version. You can test that by running ant. It will create a pom.xml for you.

Next, I do a full blown maven release with the following:
{% highlight bash %}
mvn clean release:prepare release:perform
{% endhighlight %}
This will release with the subversion number to the [Nexus](http://www.sonatype.org/nexus/) or [Artifactory](http://www.jfrog.com/home/v_artifactory_opensource_overview) Repository.

For an example, go ahead and check out my [ClosureLibrary project](https://github.com/jlgrock/ClosureLibrary).

Is it pretty? No. Does it work and is it maintainable? Very much so.