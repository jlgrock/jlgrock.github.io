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
layout: post
title: My Title
date: 2015-05-15 12:00:00 -0500
description: Some Description about the article
img: 2015/image_for_article.png
tags: [technology]
```

I'd suggest looking at the other pages as an example.

Then, commit your changes to github and it will serve those pages.

## Testing your site before you commit
Sometimes, you are doing something a little more interesting and would like to test it.  
To do this, you need to follow the 
[Jekyll Installation Instructions](https://jekyllrb.com/docs/).  At this point, you should be 
able to run the following commands:

1. Install all of the Ruby Gem dependencies

    `gem install bundler jekyll`

2. Start the server.  If you make any changes to the files, they will be reflected immediately. 
    
    `bundle exec jekyll serve`

## Updating Gemfile Dependencies
Occasionally, it is suggested that you update the dependencies so that you are not exposed to any
known security problems.  If you have a security vulnerability, it will show up 
[here](https://github.com/Kendall-Square-VA/Kendall-Square-VA.github.io/security).

Anyways, if this is the case, the most likely fix is to update your project.  This is done with the 
following command:

    `bundle update`

## Updating the site with latest Jekyll changes
If you want to create a post, just check in the file!

## Additional Reading Material

### Jekyll Project Structure
https://jekyllrb.com/docs/structure/

### Jekyll Documentation
https://jekyllrb.com/docs/