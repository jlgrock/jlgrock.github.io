---
layout: post
title: WordPress Child Themes
date: 2012-04-09
description: Extending a Wordpress theme is easy!
img: 2012/WordPress.png
tags: [wordpress]
---

I recently got a subscription to [Elegant Themes](https://www.elegantthemes.com/).  Sometimes it’s easier to buy.  It was on the customer’s dime anyways.  I originally did this for a subdomain site for GMU for their [German Department](http://germanevents.gmu.edu/).  It came out pretty well.  Hopefully they do a decent job managing the content.

In general, the guys at elegant themes did a great job in designing their themes.  Since I had access to all of their themes, I grabbed a bunch of them.  I realized the most that they did a decent job when I used one of the templates on my own site.  I liked it, but of course I had to customize the crap out of it.

Here was the original [LightBright Theme](http://www.elegantthemes.com/gallery/lightbright/).

Mostly, the things that I needed to tweak were sizes, which is all contained in the CSS.  My assumption is that if you are a decent developer, and thus use my site, you are not going to be running on a 640×480 screen.  Hardly what I would consider to be unreasonable.

Since they also do a pretty good job on this site at pushing updates to customers, I didn’t want to screw that up by messing with their templates.  Low and behold, there’s a little known ability to create a “Child Theme” in WordPress.  I love it!

I looked over a bit of Theme development documentation by reading the article at http://codex.wordpress.org/Theme_Development. Followed by Child Theme development is described at http://codex.wordpress.org/Child_Themes. You can also find a simple example that just modifies the css by following [these instructions](http://op111.net/53/).

Anyways, there was one minor hickup (the Elegant Themes folks are using some funky “truncate” that also strips out formatting, which I didn’t want), but otherwise, this went really smoothly. This has adjusted the sizes and added additional features to support Facebook and Google+. I posted the code for anyone who wants to learn Child theme development or is extending anything from the Elegant Themes templates at my [LightBrightChild github project](https://github.com/jlgrock/LightBrightChild).
