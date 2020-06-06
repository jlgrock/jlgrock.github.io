---
layout: post
title: Javascript Primer
date: 2012-10-02 12:00:00 -0500
description: A simple primer on true object oriented, functional programming, in JavaScript
tags: [javascript]
---

For those starting on JavaScript, I'm sorry.  This one's going to hurt a little bit.  First off, I'd suggest you start with 
[Pro JavaScript Design Patterns](http://www.amazon.com/JavaScript-Design-Patterns-Recipes-Problem-Solution/dp/159059908X).  
Learn everything about why it's right.  Then throw it away.  Because you'll never need the code presented in that book 
(it's been done a hundred times in a bunch of libraries.)  But, the concepts in it are invaluable.  Also, it's hard to 
find out what's built in to all of the browsers.  I'd start with 
[Essential Javascript - A Javascript Tutorial](http://www.hunlock.com/blogs/Essential_Javascript_--_A_Javascript_Tutorial).  
Hands down the best site for really learning JavaScript built in functions, though not as pretty as some of the others.  
Then I'd move on to the [Mozilla JavaScript API](https://developer.mozilla.org/en-US/docs/JavaScript"), which is a lot 
to take in, but also amazing.

Typing in JavaScript is implicit and it is handled automatically.  All you do is say "var x = 5" and it knows that x is
an int.  It's magic.  Magic that is hard to understand when stuff goes wrong.  Here's an article on understanding
[type conversion in JavaScript](http://jibbering.com/faq/notes/type-conversion/).

Also, people in Java and C seem to love [ternary operators](http://en.wikipedia.org/wiki/%3F:).  I think it's 
because everyone thinks it's clever.  For a newbie, it's hard to understand though, so I tend to avoid them in most 
cases.  However, JavaScript supports this, so you can be clever all you want in your code.  Heck, JavaScript allows 
you to be so clever that I know some folks that don't know what their own code does once they are done with it. 
Which is just awesome to support, by the way.  But I digress.  JavaScript also expands upon the ternary operator with 
the conditional-or `||` operator, which can be used in some pretty fancy ways.  For anyone interested in learning about 
the `||` [operator in javascript](http://addyosmani.com/blog/exploring-javascripts-logical-or-operator/).

OK, a bunch of people don't understand how scoping in JavaScript works.  One of the reasons for this is that most 
people are trained nowadays as Java developers (I myself was trained in C/C++, so I have my own set of issues...).  
This is an article that explains closures, for all those that need help with it.  It includes the terrible 
[closure loop issue](http://robertnyman.com/2008/10/09/explaining-javascript-scope-and-closures/). Basically, because 
JavaScript functions can be passed around as objects, you don't know who is calling it or where they are calling it 
from.  This means that the JavaScript needs to carry everything it needs with it.  This is why people call this a memory 
leak.  And they aren't entirely wrong.  Especially when people use closures like they are using Java private.  Then 
it's definitely a [memory leak](http://www.ibm.com/developerworks/web/library/wa-memleak/).

Awesome site that allows you to code a little snippet and see if it works, as well as share with others. The coolest 
part is that you can include a bunch of the more commonly used libraries, such as [JQuery](http://jquery.com/),
 [Dojo](http://dojotoolkit.org/), [ExtJS/Sencha](http://www.sencha.com/), 
 [Underscore](http://underscorejs.org/), and [Raphael](http://raphaeljs.com/) (plus a TON more, but I thought I'd 
 throw out the big ones/my favorites).  You can even get a plugin or two for your IDE or text editor to throw it 
 directly [up there](http://jsfiddle.net/) when having issues.

Well, that's about it.  I just thought I'd share some resources for the beginners out there.