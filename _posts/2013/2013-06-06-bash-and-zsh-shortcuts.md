---
layout: post
title: Bash and Zsh Shortcuts
date: 2013-06-06 12:00:00 -0500
description: Bash and Zsh Shortcuts
img: 2013/guitarlinux.png
tags: [shell]
---

I'm not going to beat you up with the benefits of using zsh over that of bash. You really should know both, since bash is everywhere. Zsh is the newer version that is a powerhouse, though. So if you should decide to use this, I suggest checking out the program <a href="https://github.com/robbyrussell/oh-my-zsh">oh-my-zsh</a>, which gets all of the common shell configurations set up for you and keeps it up to date.

But, what I really wanted to share was a good reference for bash/zsh shortcuts.  There are others out there, but they seem to be incomplete.  If I've missed anything, let me know and I'll add it.
<table>
<tbody>
<tr>
<th>Command</th>
<th>What it Does</th>
</tr>
<tr>
<td>Tab</td>
<td>Auto-complete files and folder names</td>
</tr>
<tr>
<td>Ctrl + A</td>
<td>Go to the beginning of the line you are currently typing on</td>
</tr>
<tr>
<td>Ctrl + E</td>
<td>Go to the end of the line you are currently typing on</td>
</tr>
<tr>
<td>Ctrl + F or →</td>
<td>Forward one character.</td>
</tr>
<tr>
<td>Ctrl + B or ←</td>
<td>Backward one character.</td>
</tr>
<tr>
<td>Meta + F (in OSX this is ESC, F or ALT+ →)</td>
<td>Move cursor forward one word on the current line</td>
</tr>
<tr>
<td>Meta + B (in OSX this is ESC, B or ALT+ ←)</td>
<td>Move cursor backward one word on the current line</td>
</tr>
<tr>
<td>Ctrl + P or ↑</td>
<td>Previous command entered in history</td>
</tr>
<tr>
<td>Ctrl + N or ↓</td>
<td>Next command entered in history</td>
</tr>
<tr>
<td>Ctrl + L</td>
<td>Clears the screen, similar to the clear command</td>
</tr>
<tr>
<td>Ctrl + U</td>
<td>Clears the line before the cursor position. If you are at the end of the line, clears the entire line.</td>
</tr>
<tr>
<td>Ctrl + H</td>
<td>Same as backspace</td>
</tr>
<tr>
<td>Ctrl + R</td>
<td>Lets you search through previously used commands</td>
</tr>
<tr>
<td>Ctrl + C</td>
<td>Kill whatever you are running</td>
</tr>
<tr>
<td>Ctrl + D</td>
<td>Exit the current shell</td>
</tr>
<tr>
<td>Ctrl + Z</td>
<td>Puts whatever you are running into a suspended background process. fg restores it.</td>
</tr>
<tr>
<td>Ctrl + W</td>
<td>Delete the word before the cursor</td>
</tr>
<tr>
<td>Ctrl + K</td>
<td>Kill the line after the cursor</td>
</tr>
<tr>
<td>Ctrl + Y</td>
<td>Yank from the kill ring</td>
</tr>
<tr>
<td>Ctrl + _</td>
<td>Undo the last bash action (e.g. a yank or kill)</td>
</tr>
<tr>
<td>Ctrl + T</td>
<td>Swap the last two characters before the cursor</td>
</tr>
<tr>
<td>Meta + T (in OSX this is ESC, T)</td>
<td>Swap the last two words before the cursor</td>
</tr>
</tbody>
</table>
&nbsp;

<strong>Update 7/22/2013</strong> - My buddy [David Souther](http://davidsouther.com/) liked this one so much he created a little worksheet from it and added some sed commands.  It's great for a reference.  Check it out [here](http://www.cheatography.com/davidsouther/cheat-sheets/bash-zsh-shourtcuts/)!