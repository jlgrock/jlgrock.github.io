---
layout: post
title: Another Microsoft Product Bites the Dust - At Least for Me
date: 2013-06-30 12:00:00 -0500
description: Another Microsoft Product Bites the Dust - At Least for Me
tags: [technology]
---

To anyone who has received an obvious hacked account email from me, sorry.  I am finally moving to GMail.  The 
reason - a better 2 factor authentication.

Such a simple thing that they could have implemented and I would have been happy for them to index my data, purchasing 
habits, and connections all day long.  I had never moved over to GMail (though I had an account) because (a) I don't 
want to give Google <em>everything.</em>  They have to work for it a bit, (b) I actually like the interface, especially 
when they moved to outlook.com, and (c) they were the incumbent.  I had a hotmail account before hotmail was bought up 
by Microsoft and I didn't mind it.

But now that I've been hacked twice in 2 months, I've learned my lesson.  After the first attack, I moved all of my 
contacts out of hotmail.  They used the contact list to email everyone.  I figured if I could just keep that separated, 
there would be less problems.  I use an Android phone at home anyways, so most of my contacts were in Google already 
anyways, so I just left it there and would reference it occasionally.  After the first attack, though, I changed the 
password to something that would never be hacked.  I use a password generator that creates extremely hard to remember 
and use passwords.  After I got hacked the second time, I checked how secure my password really was.  It was pretty 
solid.  The password, based on [this webapp](https://passfault.appspot.com/password_strength.html) would take 
approximately a century for a standard computer to crack.  That seems reasonable, right?  Apparently it's not enough.

Truthfully, if you were to throw Amazon EC2 instances at it, I could see it taking a matter of hours to crack it 
instead of days, but that's a lot of money for my insignificant emails.  But after the second one, I noticed something 
interesting - they weren't originating from my server.  Someone had hacked into Microsoft's system - somewhere in the
middle.  Looking at the IP addresses that were sent from previous emails and the IP addresses that was used sending the 
bad emails, it looks like there is a disconnect somewhere in the Microsoft network.

Now, I could totally be wrong and they could be doing something totally different.  But you know what?  My 16 character 
password was hard enough to remember. Microsoft 
[has finally implemented 2 factor authentication](http://windows.microsoft.com/en-us/windows/app-passwords-two-step-verification),
but is it too little, too late?  Also, you can't control it very well yet in their system, so it looks like if you want
to revoke privileges, it is for every device you have or none at all.  Seems like something they should work on.

I implemented it anyways, just so I could feel safe about forward along to my Gmail account.  It was mostly me, but at
least partially you.  Well, Microsoft... so long, and thanks for all the fish.
