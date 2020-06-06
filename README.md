My Website
=================

# What it is

My site!  I got sick of hosting this myself on AWS and dealing with the security updates that come with
AWS LAMP (Linux, Apache, Wordpress, MySql).  I could have either paid more for someone/thing to manage this for me, or went simpler and
go interpreted static.  So moving to [Jekyll](https://jekyllrb.com) seemed like the best option.  Plus, it gave me a
reason to play with new tech.

## How to add an article
This particular site is set up to serve files from static folders in the `_posts` directory.  This timestamps them for 
serving.  There should be folders corresponding to years, and then inside those folders are markdown files prefixed 
with a date (yyyy-mm-dd).  For example, the post titled `My Title` would be a file that might be named 
`2015-05-15-my-title`.  Then, make sure that you have a section at the top that follows this format:

```md
---
layout: post
title: My Title
date: 2015-05-15 12:00:00 -0500
description: Some Description about the article
img: 2015/image_for_article.png
tags: [technology]
---
```

Then, commit your changes to github and it will serve those pages.

## Running the Website Locally
If you should want to see your pages served up in the website, it's suggested

## Updating the site with latest Jekyll changes
If you want to create a post, just check in the file!

