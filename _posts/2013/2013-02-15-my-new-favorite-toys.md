---
layout: post
title: My New Favorite Toys
date: 2013-02-15 12:00:00 -0500
description: New tech is fun
img: 2013/toys.jpg
tags: [technology, configuration-management]
---

OK, I'm going to admit it.  I tend to get really excited about Configuration Management (CM) type work and I have no idea why.  This is one of those.

## Machine Images/Virtual Machines
Ok, these have been around.  If you don't know what a machine image is, then stop and go download [Oracle's VirtualBox](https://www.virtualbox.org/), because it is something that everyone should know.  These were revolutionary when they first were introduced.   So much so that most Operating Systems support some form of images (disk or machine) right out of the box.  Especially because a number of companies, including [VMWare](http://www.vmware.com/) and [Parallels](http://www.parallels.com/), found out that they could manage your hardware better than the Operating System (which was originally supposed to do just that, but has really turned into something much more complex and more like a user interface). So, it turned out that if you used machine images, you could have a snapshot to a point in time. Sure, it still required some configuration after getting it going, but after that, it was cake. IT departments (and Dell/Norton, with their Ghost Image partition) were loving it. It really cut the mind-numbing monotony of setting up new boxes.

## Puppet and Chef
Essentially, [Puppet](https://puppetlabs.com/) and [Chef](http://www.opscode.com/chef/) do a lot of the same things.  Both start on the assumption that you have a base image installed on your box. Both represent a language that gives you the ability to install the software, users, and whatever else is necessary on a box to have it ready for tasking.  Both have claimed to support all major OS options.  This way, you could install the same users on the Windows boxes and Unix boxes in one script!  Of course the multiplatform argument is crap, but it still is a great option to finish what Machine Images started.

Take passwords for example.  Each OS handles this so completely differently that you would have to create a different module for the password for each OS.  Too much hassle.  Most companies are going to pick an OS and stick with it.  Heck, most are going to pick the same hardware too. This is the suggested use for almost all companies anyways.  Google, Yahoo, Amazon, etc. all use proprietary hardware.  But it's THE SAME proprietary hardware.  Every machine has the same specifications.  (If you want, check out the [Google server machines](http://news.cnet.com/8301-1001_3-10209580-92.html) or the [data center](http://www.wired.com/wiredenterprise/2012/10/ff-inside-google-data-center/all/).  And I'm guessing most of them aren't Windows boxes. Just sayin'.

So, you create a new machine configuration for each type of machine.  One for your Web servers, one for the database servers, etc. Makes scripting all boxes that you might want to make really easy. Plus, in a cloud environment, like [Amazon EC2](http://aws.amazon.com/ec2/) or privately held [HDFS](http://en.wikipedia.org/wiki/Apache_Hadoop) clusters, this makes setting up servers a breeze.

The difference between Puppet and Chef is their target audience.  Although they are technically competing products, both companies have pretty much stated that their real competition is the rats net of batch/shell scripts that you've probably written, or even better yet the documented instructions like [the following](http://www.robbyonrails.com/articles/2010/02/08/installing-ruby-on-rails-passenger-postgresql-mysql-oh-my-zsh-on-snow-leopard-fourth-edition).  We've all written these before.  And they even sometimes work.  Sometimes.

## Vagrant
Another fun toy. So now, assuming you start using the Puppet/Chef to start requisitioning your servers, everything is great. Every server that gets started is always the same. Starts from the same image. Now you know that every server will run the same. Huzzah! But as every web developer knows, we don't test enough for IE. Why? Because as a developer, I f'ing hate it. Because I don't use it, I probably miss bugs.  Same applies to servers.  I'm missing bugs because I work in Windows or OS X, but deploy to a totally different environment.

[Vagrant](http://www.vagrantup.com/) is a fun new tool that takes that really nice puppet script and image that you'd made, load it into a virtual machine, and run it in the background.  That way, you have the exact same environment that the server has, but on your local machine.  So, if you need to, you can ssh into it.  You can update your puppet scripts and push changes to it.  It also does port forwarding from your machine to your virtual machine, so that any exposed REST service or port is fully accessible via a web browser.  (If you want to play with it, the best install guide I found is [here](http://net.tutsplus.com/tutorials/php/vagrant-what-why-and-how/)).

Now, you can avoid the annoying statement from your coworkers that is "Well... it works on my machine."  Because I don't care if it works on your machine.  Now, I only care that it works on the production environment.  You have it locally, so make sure to test it there.

## Boxen
My new toys just got better.  Your IT department can now set up your computer for your project within minutes by using a new product called [Boxen](http://boxen.github.com/).  This is also based on Puppet and brought to you by the GitHub folks (who also brought you [Hubot](http://hubot.github.com/)).  This software was originally designed to install project specific files and programs on OS X, but since Puppet is very much a OS independent tool, I'm guessing it will work on Linux (Good luck Windows guys.  Although Puppet might work, I doubt the tool will, but only time will tell.)

## Overview
So, the tools are changing to help us stand up and deploy 1 to 1,000 servers with ease. Developers can run the exact same environment is working there. Now, we should wait and hope for Internet Explorer to give up on their web engine, [much like Opera did](http://news.techworld.com/applications/3426051/opera-follows-chrome-and-safari-to-webkit-rendering-engine/) (some say for [performance reasons](http://www.zdnet.com/opera-goes-webkit-its-all-about-performance-7000011266/)) and we might eventually get to a uniform presentation platform as well.  Wouldn't that be nice?
