---
layout: post
title: Adding Swap Space to your Server
date: 2015-06-21 12:00:00 -0500
description: Adding Swap Space to your Server
img: 2014/penguin-161356_640-e1437511358837.png
tags: [linux]
---

I seem to keep coming across this problem with web servers where I set something up on AWS and it runs poorly.  This 
is usually because I forgot to set the swap space.  Swap space is a system that the operating system uses so that it 
doesn't have to keep everything in memory.  It will write the least used information to disk.  We all know (I hope) 
that disk is a factor of 1000x slower (unless you use SSDs, which it is just a factor of about 10x slower), so it's 
important to keep track of how much memory your system is using.

However, it's still better than running out, which means that your applications aren't slow... they are broken.  There 
are a couple of other websites that document this, with some varying similarities to what I do.  So, I figured I'd 
share it (and thus not forget it again).

Note that you can either run this as root or add "sudo" to the front of each of these commands...

First, display the swap information for the current device.  If this is a standard AWS server, nothing will be printed.  
If you or someone else has already added some swap space, it will be printed here.

`swapon -s`

Next, convert and copy a file, in this case I will use the null file, to the location where I want my swap file to be.  
In this example, I will use "/swapfile". Also, for this file should copy in block sizes of 1MB and end up copying 1024 
blocks. This would be a total of (1024 blocks * 1024MB =) 1GB. Feel free to modify these numbers to match the swap 
size that you want.

`dd if=/dev/zero of=/swapfile bs=1M count=1024`

Next, create a swap file at the location that you want (again, I'm using "/swapfile" for this example)

`mkswap /swapfile`

Next, turn on the swapping for this location

`swapon /swapfile`

Lastly, you need to edit the file systems table (fstab) configuration file, which is usually stored at the 
location `/etc/fstab`

`vi /etc/fstab`

In the fstab file, add the following line (again, assuming that the location is `/swapfile`) to the last line and save

`/swapfile swap swap defaults 0 0`

At this point, there should be no need to restart your system, as Linux knows to adjust using this file.
