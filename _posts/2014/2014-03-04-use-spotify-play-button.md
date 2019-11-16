---
layout: post
title: Want to use Spotify, but Apple trying to force you to use iTunes?
date: 2014-03-11 12:00:00 -0500
description: Updating your system settings to allow the play button to use Spotify
img: 2014/spotify_icon.png
tags: [technology]
---

OK, it's not a secret that I'm not the biggest fan of the iTunes program.  A flat layout for my hundreds of Gigabytes of mp3s... seems like a poor layout.  Plus, I spend more time listening to music at work than at home, where my music collection is.  Fortunately, I have access to a bunch of music through Spotify, which has a pretty large collection to draw from.  I'm not going to argue with folks about the upsides and downsides to Spotify.  I do understand that plenty of musicians get screwed and plenty of musicians make a mint.  I also understand that the one making most of the profit is Spotify.  But, being a consumer of music (at this point in my life) more than a producer, I definitely enjoy the freedom of being able to explore new music without dropping huge amounts of cash, or like many of the less fortunate, downloading illegally.  So, bitch all you want, this is what the people want, so we'll all figure out how to make money off of it.  Oh, and please support local talent as much as you can.

That being said, I did research to disable the opening of iTunes and found a wonderful little script created by Farhan Ahmad (aka "thebitguru") which disabled it.  Even though this was nice, I wasn't quite satisfied.  I wanted Spotify to come up when I hit "Play", because when I hit "Play," I probably want to listen to music.  So, I forked his code and modified the python script to change the default program that is opened whenever you hit the "Play" button on your keyboard.  It's not too complicated, and truthfully, you can adjust it to open any other program you want.  You would rather use VLC?  Just edit the string in the python script (very little editing using the Applescript language) and off you go!  So, if you want to change the default behavior of apple, go over and follow the instructions on my [github project](https://github.com/jlgrock/play-button-spotify-patch), or if you just want to disable it, go on over to [Farhan's github project](https://github.com/thebitguru/play-button-itunes-patch)

** Update - Released as part of OS X El Capitan, [System Integrity Protection](https://support.apple.com/en-us/HT204899) no longer allows you to edit.  But it's still an interesting project, if you are willing to disable System Integrity (not suggested).
