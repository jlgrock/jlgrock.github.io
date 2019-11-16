---
layout: post
title: Back to Basics - The Bash Shell - Part I
date: 2018-??-?? 12:00:00 -0500
description: Back to Basics - The Bash Shell - Part I
tags: [shell]
---

OK, so I've been a windows developer for entirely too long and forgot a bunch of what I had learned in/after college about the shell, so I went on a little adventure to re-learn (and learn more) about the shell that I work in on a daily basis now that I'm working on OSX and Linux. I figured I'd share my story as well as what I learn along the way by creating this series of articles. 

The first job that I got out of college was one with a document automation company. The were a different kind of shop. I had originally started working as a Oracle DBA in college working on Solaris and this job was very much not that. These guys were working with Java and a MS-SQL backend. This is different because most choose to either go fully open source (Java + MySQL) or fully Microsoft (C# + MS-SQL). This experience was great, though, because I gained experience with MS products. And guess what fellas. MS-SQL is WAY easier than the MySQL stuff. MySQL is getting better, but it's got a long way to go. Oracle too. They did a great job making that Database easy to use. Too bad the licensing is crazy expensive. But I digress. 

Moving to my new company, I started as a Java developer and we were all required to have Cygwin installed for our company to generate keys. I will admit that I had totally forgotten how nice it was to work on the command line. I used this over the Windows command line or the .NET PowerShell. I so hate writing batch scripts, which never work on the different versions of windows. And just add objects oriented scripting to it with PowerShell, where it just gets stupid. Again, I digress. 

So, I started to learn my tools for the command line again. I was working down a bunch of websites that are great references, but there are problems with this way of doing it. Most websites are just a bunch of grouped man pages. Same problem here as when I am at the command line. If I don't know the command, then I don't know to look for it. It's annoying. So I picked up a book that I found reference to somewhere. So far, it's been a great investment. It's called [From Bash to Z Shell by Oliver Kiddle, Jerry Peek and Peter Stephenson](http://www.amazon.com/Bash-Shell-Conquering-Command-Line/dp/1590593766). Feel free to pick it up.  It's cheap and I plan on keeping mine around for reference and possibly to pass on to my kids when I force them into using Linux (...yeah, I'm going to be that guy.) It mainly covers bash and zsh, and touches on some of the history of sh, csh, ksh, tcsh, as well as a couple of others. But, since it contains a bunch of good things (which I plan on NOT covering in the detail that these guys do). I'll share some of the tools you learn about in the book and add a bunch of my own. I'll keep them fairly succinct though, so that it is more of a reference than a learning tool. Again, if you want to learn these in detail, get the book. So, let's get started. 

## Processes
The shell is a process. It allows you to execute other processes via a simple language of character combinations or mouse clicks (UI works on processes too). To executing a process, you can call it via the command line or double clicking, you kick off a separate process. Once the process has completed execution, it returns to the previous process. In the command line, this is easy to visualize. Type `cd` or double click on a folder. This will execute the "change directory" command and return to the shell. If there is an error, it will tell you. If you want to kick off another process and tell it not to return, you can use the `&` at the end of a line. For example, if you type `ping google.com &`, it will execute a command and return you to the shell immediately.  In a background process it will not be checking the responses of the google.com website.

## Output Streams
OK, so I just glossed over something there in the last section. I said, "If there is an error, it will tell you." How? Feel free to stop and ask those types of questions in books. It's the only way to learn. :) Bear with me, baby birds! So, there are three streams for a process. These are the following: InputStream (stdin), OutputStream (stdout), and ErrorStream (stderr). Most shells will direct the OutputStream and ErrorStream to the terminal window. It processes them as it gets each message in the stream. Since you have two streams, you can have some odd mixing of errors and output, but since it is one process, it usually isn't too bad. Not unless the process is multithreaded (which just means that it starts more processes itself), at which point output can be confusing as hell if it is directed to the terminal window. You can redirect/divert the output of a process using a number of shell operators. 


Here's a couple.

**Redirect ping OutputStream to a file called temp.txt**
{% highlight bash %}
ping google.com > temp.txt
{% endhighlight %}

**Redirect ping ErrorStream to a file called temp.txt**
{% highlight bash %}
ping google.com 2> temp.txt
{% endhighlight %}

**Redirect ping OutputStream and ErrorStream to a file called temp.txt**
{% highlight bash %}
ping google.com &> temp.txt
{% endhighlight %}

**Redirect ping OutputStream to the ErrorStream**
{% highlight bash %}
ping google.com 1>&2 
{% endhighlight %}

**Redirect ping ErrorStream to the OutputStream**
{% highlight bash %}
grep * 2>&1
{% endhighlight %}

**Redirect ping OutputStream and ErrorStream to the [null device](https://medium.com/@codenameyau/step-by-step-breakdown-of-dev-null-a0f516f53158)**
{% highlight bash %}
ping google.com &> /dev/null
{% endhighlight %}
