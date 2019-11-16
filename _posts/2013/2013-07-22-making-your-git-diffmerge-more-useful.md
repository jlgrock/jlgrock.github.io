---
layout: post
title: Making your Git Diff/Merge More Useful
date: 2013-07-22 12:00:00 -0500
description: Making your Git Diff/Merge More Useful
img: 2013/Git-Icon-Black.png

tags: [git]
---

OK, it is understood that you should try to keep your commits small in git, as well as other content versioning systems, but sometimes, you have to refactor or have a branch that won't die.  Unfortunately, the merge process gets really painful.  Depending on what you are merging, this can sometimes be made much easier.  For example, if you are coding, the default line-by-line compare kinda sucks.  So I did a bit of research with my buddy, [David Souther](http://davidsouther.com/), to find out how to make this better.

## Patience algorithm
The first algorithm is called the patience algorithm, which is documented visually [here](http://alfedenzo.livejournal.com/170301.html).  It's basically searching for matching full lines to find points that haven't changed.  This is useful, because if you are programming an API, this is likely to change less frequently than the code inside the API.
<h2>Histogram Algorithm</h2>
This is the one that jgit uses by default.  Eclipse, in turn uses the egit plugin, which uses jgit under the hood.  So basically, Eclipse uses this by default.  I attempt to stay out of the IDE as much as possible these days though, so I'd rather this be run on the command line.

## Myers Algorithm
There is also a third, only sometimes useful one called Myers algorithm, which is a basic [greedy algorithm](https://en.wikipedia.org/wiki/Greedy_algorithm).  It can sometimes be useful when you know that your code is in large runs in particular section.  More info [here](http://www.codeproject.com/Articles/42279/Investigating-Myers-diff-algorithm-Part-1-of-2).

## Testing it out
To test these out, anyone can do the following to see the default compare of a file and the last change in its history:

{% highlight bash %}
git diff HEAD HEAD^ example.file
{% endhighlight %}

versus the following, which will run the patience algorithm:
{% highlight bash %}
git diff --patience HEAD HEAD^ example.file
{% endhighlight %}

## Keeping the Change
You get the general idea.  Just adjust the algorithm with the "--histogram" or "--myers" flags.  If you want to keep a particular one, run "git config --global diff.algorithm patience", which will save this as your default git diff algorithm.
