---
layout: post
title: SourceMaps are the new Sliced Bread!
date: 2012-11-18 12:00:00 -0500
description: A simple primer on true object oriented, functional programming, in JavaScript
img: 2012/HTML5_Logo_512.png
tags: [javascript]
---

What are SourceMaps?  Basically, it maps the code in your minified/obfuscated/compiled file to the original source code.

Think about that for a second.  If you are a JavaScript developer, you are constantly dealing with minified files, or in the case of some of the fun newer technologies, such as [Google's Closure Tools](https://developers.google.com/closure/) or [CoffeeScript](http://coffeescript.org/), you are actually compiling the code provided.  In each of these cases, it is changing from JavaScript to another form of JavaScript.  Most the time, once we start using the minified/obfuscated/compiled, we have no idea what's going on and have to switch back to the "debug" version if we want to figure anything out.  And we assume that the Minifier/Compiler has done nothing wrong to our code in the process (sometimes a stretch, especially with some of the newer ones).

The SourceMap is a separate file that can be provided that will give general descriptions to help the browser map the files back to the original codebase.  That way, if you have issues in the compiled code, you step through the code, and the browser knows exactly where to put you in the debug code.  How sweet is that?

They are something simple that was developed by the Mozilla group (check out the mozilla [SourceMap](https://github.com/mozilla/source-map)), that was gobbled up by Google Chrome as well because of how unbelievably useful it is.  Thanks to a fellow developer (Patrcik Gilmore) in Oslo, Norway, we now have this available in the [Maven](http://maven.apache.org/) [ClosureJavaScriptFramework Plugin](https://github.com/jlgrock/ClosureJavascriptFramework).  So for anyone interested, feel free to start using the plugin.

Obviously, I didn't provide a ton of information on how to use it.  Turns out there isn't much out there yet either.  But, there is a nice link on how to use SourceMaps in your browsers at [HTML5 Rocks](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/).  Check that out and it should get you using it pretty quickly.  Another downside, it's not supported by everyone yet.  But just you wait, everyone's going to be jumping on this bandwagon.  There are just too many people that will find this useful.  So, if you are using some of these minifiers/compilers, put in a request to get that little .smap file added!