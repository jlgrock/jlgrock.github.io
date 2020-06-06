---
layout: post
title: ImpressNotes
date: 2012-12-02 12:00:00 -0500
description: An exploration of a library extension
img: 2012/yoda.png
tags: [javascript]
---

A bunch of people enjoy the new Slide technologies that are coming out using HTML5.  You can check some of them out 
here at [Html5Rocks Slides](http://www.html5rocks.com/en/slides).  Unless you are doing something fancy, though, you 
probably shouldn't write all of the JavaScript to do this yourself.  This is for the same reason that you shouldn't 
write a DOM manipulation tool yourself (cause #1 - don't do work that you don't have to do, and #2 - 
[JQuery](http://jquery.com/) already did it and they did it better than you or I likely will.)  A little while ago, 
I posted about a friend using [JQuery Presentation Using ImpressJs]({% post_url /2012/2012-04-09-jquery-and-impress %}).  
I got a chance to use it myself now.  It's a really useful library that does the slide moving, using any number of 3D 
transforms (kinda like [Prezi](http://prezi.com/) on crack*).  Also, my friend had coded against an older version.  The 
newer versions allow you to have triggers to kick off other pre/css and post/css, so if you want to do some cool
transforms like [Apple showcases](http://www.apple.com/html5/showcase/transitions/), you can do that.

Also, something that my buddy noticed is that with any presentation anyone gives, you usually have notes to read from.  
These are really helpful if you are the presenter and you need help remembering (that would be me) or for those 
viewing after the presentation has happened.  This is standard in a presentation tool like PowerPoint or Keynote.  
I took some of the code that he wrote and modified it to be a bit less intrusive to the library, which follows a more 
Aspect Oriented approach.  So, if you ever need to use notes with your ImpressJs presentation, please feel free to 
use/modify the [ImpressNotes](https://github.com/jlgrock/ImpressNotes) project.  I still want to add a timer to it 
too, so I'll probably tinker with it some more.

*Obviously, you're going to still have to be a developer to use this, vs Prezi, which you can be non-technical. 
So don't get me wrong.  Not knocking Prezi.