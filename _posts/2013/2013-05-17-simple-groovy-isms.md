---
layout: post
title: Simple Groovy-isms
date: 2013-05-17 12:00:00 -0500
description: Simple Groovy-isms
tags: [groovy]
---

You learn pretty quick when switching over from Java to Groovy. Problem is that it is fairly backwards compatible, so if you aren't doing something in the easiest way possible, it may be hard to know. For the basics, I just want to state them so that everybody is at least covering the basics.

## Scoping
By default, classes are public in groovy. Don't add the public keyword. Similarly, member variables are private. The accessors and mutators are generated (as you'll see in the next section).

## Accessors and Mutators
Accessors should be adjusted from
{% highlight groovy %}
dbCollection.getMyVar()
{% endhighlight %}
To the following
{% highlight groovy %}
dbCollection.myVar
{% endhighlight %}
Similarly, the mutator
{% highlight groovy %}
dbCollection.setMyVar(10)
{% endhighlight %}
should be used as follows
{% highlight groovy %}
dbCollection.myVar = 10
{% endhighlight %}
It looks like you are accessing the private method, but it's not. It's just shorthand for calling the "get" function. This is important because even if there is no member variable - such as x.getCount(), this should still be called using x.count. That's one of the fun shortcuts in Groovy.<!--more-->

## GStrings vs Strings
You should know the difference. It's pretty important. For info about these, click [here](http://groovy.codehaus.org/Strings+and+GString). It covers it in depth pretty well. Basically, just know that single quotes and double quotes are very different. And if you use 3 double quotes or 3 single quotes to start a string, you are doing a multi-line string.

Using this, your strings should be adjusted from the following Java-like syntax
{% highlight groovy %}
dbCollection.insert("abc" + var1 + "def" + var2.prop)
{% endhighlight %}
To the following
{% highlight groovy %}
//(Gstring parses faster using the formatter and string buffers)
dbCollection.insert("abc $var1 def ${var2.prop}")
{% endhighlight %}

## Print Statements
Although I would suggest that you use something like log4j/slf4j/etc rather than printing directly to the console, print statements get easier:
{% highlight groovy %}
System.out.println("something")
{% endhighlight %}
Should be changed to
{% highlight groovy %}
println 'something'
{% endhighlight %}

## Collections
There are so many goodies added to the collections GDK that it's very hard to cover it all. But syntax-wise, there are only a minor couple of changes to make:

For maps, accessing and
{% highlight groovy %}
Map m = new HashMap<!--?,?-->()
System.out.println(m.get('abc'))
m.put('abc', 2)
{% endhighlight %}
should be
{% highlight groovy %}
Map m = [:]
println(m['abc'])
m['abc'] = 2
{% endhighlight %}
Also, the following also works to the same effect
{% highlight groovy %}
Map m = [:]
println(m.abc)
m.abc = 2
{% endhighlight %}
For lists, this
{% highlight groovy %}
List arr = new ArrayList&lt;?&gt;()
System.out.println(arr.getAt(2))
{% endhighlight %}
{% highlight groovy %}
Array arr = []
println(arr[2])
{% endhighlight %}

## For Statements
Basically, don't use them anymore (there are a couple of valid cases, but they are mostly not necessary within groovy.  The following for statement
{% highlight groovy %}
for( i = 0; i &lt; 20; i++ ) { funcCall(i) }
{% endhighlight %}
can be rewritten as
{% highlight groovy %}
(0..&lt;20).each { funcCall(it) }
{% endhighlight %}
This uses the range object within groovy.  For more details on the Range Objects in groovy, click [here](http://mrhaki.blogspot.com/2009/09/groovy-goodness-keep-your-values-in.html). Also, it then uses the each function on the range object, passing it one parameter, a Groovy Closure. Closure's are one of the most powerful things in Groovy. It allows you to design very functionally (rather than in a totally object-oriented way). For more information on these, please visit [Groovy's Closure page](http://groovy.codehaus.org/Closures).

## Further Reading
Don't stop now!  There's so much more to learn!  Head over to http://groovykoans.org/ and practice using some simple Groovy testing.
