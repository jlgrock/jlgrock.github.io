---
layout: post
title: Bash and Zsh Shortcuts
date: 2013-06-06 12:00:00 -0500
description: Bash and Zsh Shortcuts
img: 2013/guitarlinux.png
tags: [shell]
---

I'm not going to beat you up with the benefits of using zsh over that of bash. You really should know both, since 
bash is everywhere. Zsh is the newer version that is a powerhouse, though. So if you should decide to use this, I 
suggest checking out the program [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh), which gets all of 
the common shell configurations set up for you and keeps it up to date.

But, what I really wanted to share was a good reference for bash/zsh shortcuts.  There are others out there, but 
they seem to be incomplete.  If I've missed anything, let me know and I'll add it.

| Command           | What it Does                                                |
| ------------------| ----------------------------------------------------------- |
| Tab               | Auto-complete files and folder names                        |
| Ctrl + A          | Go to the beginning of the line you are currently typing on |
| Ctrl + E          | Go to the end of the line you are currently typing on       |
| Ctrl + F or →     | Forward one character                                       |
| Ctrl + B or ←     | Backward one character                                      |
| Meta + F (in OSX this is ESC, F or ALT+ →) | Move cursor forward one word on the current line |
| Meta + B (in OSX this is ESC, B or ALT+ ←) | Move cursor backward one word on the current line |
| Ctrl + P or ↑     | Previous command entered in history                         |
| Ctrl + N or ↓     | Next command entered in history                             |
| Ctrl + L          | Clears the screen, similar to the clear command             |
| Ctrl + U          | Clears the line before the cursor position. If you are at the end of the line, clears the entire line |
| Ctrl + H          | Same as backspace                                           |
| Ctrl + R          | Lets you search through previously used commands            |
| Ctrl + C          | Kill whatever you are running                               |
| Ctrl + D          | Exit the current shell                                      |
| Ctrl + Z          | Puts whatever you are running into a suspended background process. fg restores it |
| Ctrl + W          | Delete the word before the cursor                           |
| Ctrl + K          | Kill the line after the cursor                              |
| Ctrl + Y          | Yank from the kill ring                                     |
| Ctrl + _          | Undo the last bash action (e.g. a yank or kill)             |
| Ctrl + T          | Swap the last two characters before the cursor              |
| Meta + T (in OSX this is ESC, T) | Swap the last two words before the cursor    |

<strong>Update 7/22/2013</strong> - My buddy [David Souther](http://davidsouther.com/) liked this one so much 
he created a little worksheet from it and added some sed commands.  It's great for a reference.  Check it 
out [here](http://www.cheatography.com/davidsouther/cheat-sheets/bash-zsh-shourtcuts/)!