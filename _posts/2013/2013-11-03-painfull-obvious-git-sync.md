---
layout: post
title: Painfully Obvious - Synchronizing Git and SVN
date: 2013-11-03 12:00:00 -0500
description: Painfully Obvious - Synchronizing Git and SVN
tags: [git]
---

So I was put into a funny position where we need to mirror our code to a customer's Subversion (SVN) repository 
recently. Basically this is a customer requirement. We have been working in Git forever though, and the paradigm shift 
to move back to Subversion is just not acceptable once you get used to Git or any of the other DVCS options. It's 
literally painful. Unfortunately, some customers dictate the rules. So, we were trying to figure out how to mirror the 
code in the best possible way. Let me walk you through my day and thought process. Please note, the end solution was 
not one that was perfect. Actually, the perfect solution doesn't really exist, but this is the best we could do and 
hopefully it saves folks some time.

## The scenario
Most of our changes were being kept in Git, with an occasional push to Subversion. But when in Subversion, we may have 
some integration issues and have to push back a couple of changes. If we can keep the history synchronized, awesome. 
If not, the merges just need to be reasonably painless.

## RSync
The first thing we did was to use RSync.  It's old, but it got us started.  We were able to overlay our files from the 
git repository onto our subversion repository and it worked.  Until someone made a change to our config file.  Turns 
out, the customer wanted to be able to mess with our build/deploy files so that they could move them to different 
servers using <a title="Puppet" href="http://puppetlabs.com/" target="_blank">Puppet</a>.  So, we started seeing 
conflicts in both directions.  RSync doesn't work well for this, especially with newly created/deleted files in both 
directions.  We started missing things.  Not acceptable, especially when the stupid bugs can take hours to find and 
debug.  Then I don't want them to fail for random sync issues.

## git-svn
So, the next thing we did was look into [Git-SVN](http://git-scm.com/book/en/Git-and-Other-Systems-Git-and-Subversion).  
Straight out of the Git manual, this is a tool that I have used for years.  Of course how I used it didn't quite align 
with this problem.  You see, when you use Git-SVN, you usually want to connect to a SVN server and pull the history and
work on it locally in git.  Truthfully, it's sometimes helpful and sometimes silly.  The upside is that you get the 
entire repository, so if you have to work in a disconnected state, you can check history and do small commits.  The 
downside is that you have to then realign your data into a single branch 
([rebase](http://git-scm.com/book/en/Git-Branching-Rebasing)) to push it back to the server.  Not going to lie, this is 
how I learned Git in the first place, and I really never looked back.  However, for simplicity, using SVN directly is 
much easier.  The point, though, is that we knew the tool and wanted to see if we could do a git-svn clone and then add 
a second git repository using the command `git remote add origin https://myGitUrl`

We were able to do this, but it didn't work like we thought.  The problem was that it tried to merge subversion and git 
history.  Turns out, these are nothing alike.  Conflicts everywhere.  And it makes sense, if you think about it.  Every
time you make changes in Git, you are giving it a bunch of information, such as where it came from and where it gets 
merged back to, and Subversion keeps none of this.  So going back and forth between the two systems really wasn't going
to work.

## git-svn in an orphaned branch
The next thing we did was to try to set up a new git clone of the original and then use git-svn in an orphaned branch
and see if the merging algorithms that Git provides are a little more friendly than dealing with RSync. Kinda/sorta
worked. Still had to look at the entire history of Subversion, which is what we were trying to avoid.

## Desperation and Subgit/Mirroring
At this point, we had no idea what to do. This stuff wasn't working. We were googling like crazy to find anything 
else that we hadn't already attempted. The best solutions that we could find were [Subgit](http://subgit.com/), which 
was a really interesting product that mirrors all changes over to Git. Problem with this product is that it needs to 
be installed on the Subversion server. Yeah, that wasn't going to fly. Another option we found was to set up a third 
server that the entire job was to sync the history of the two. You can find details of this 
[here](http://blog.tfnico.com/2010/11/git-svn-mirror-for-multiple-branches.html). Doesn't work if you change in both 
places though.

## Simple Solution
Should have followed the [KISS](https://en.wikipedia.org/wiki/KISS_principle) principle. I was way overcomplicating 
this. I didn't actually care about keeping the history up to date in the Subversion server. I came across 
[a site](http://blog.g14n.info/2013/10/using-git-and-svn-together.html) that gave me my "aha" moment. We are not
caring about the history anymore, but we do need to track it somewhat. Git and Subversion both work on the files,
so who cares about the history. I'll just use both and check into both to synchronize. The guy on that site had it
mostly right to match what I needed to do, so I'll just expand upon it.

First, use Subversion to clone the repository in the same place:

```bash
svn co https://mySvnUrl
```

Now, following the instructions in the 
[Subversion documentation](http://versionsapp.com/documentation/versions_faq_global-ignore.html), make sure that 
".git" and ".gitignore" to your global ignores (please note, you better have a reasonable newer version of Subversion 
to use this).

Then, set up a bare repository by executing the following:

```bash
git init
```

Then, [add the remote repository](http://git-scm.com/book/ch2-5.html) to your local Git repository. I chose to make it 
my origin (this has special meaning to Git, so make sure you know what it means).

```bash
git remote add origin https://myGitUrl
```

Next, make sure that in the root directory, you have an [ignore file](https://help.github.com/articles/ignoring-files).
Then add ".svn" to the Git Ignore file.

Next, we are going to overwrite your subversion files with your Git repository. Don't worry, you'll be able to see what you've changed before checking it back in. Just in case there was something in Subversion that mattered. Do this by executing the following:

```bash
git pull origin master
```

This will have overlayed your files on top of Subversion, and will force you to [merge](http://git-scm.com/book/en/Git-Branching-Basic-Branching-and-Merging) the files, if there are any conflicts. Make sure that everything is to your liking and commit. If there are any files that are new on the Subversion side, you will have to add them using the ["git add" command](http://gitref.org/basic/). Then you would execute something like the following, which will commit all tracked files with a message:

```bash
git commit -am "initial synch with Subversion"
```

Now, anytime you want to push back to Subversion, you can get a list of the commit messages since the last change by 
just listing the hash number (currently set at "49f947c099383f7fa8076b3da3b16a5ac9c29630") that you want to start the
range of, to the current revision ("HEAD"). Basically, you are setting a range:

```bash
git log --no-merges --pretty --format="%H - %an: %s" 49f947c099383f7fa8076b3da3b16a5ac9c29630..HEAD
```

Then you can use this in a commit message to Subversion:
```bash
svn commit -m "..."
```

If you keep doing this every time you commit to subversion too, you'll have the last hash number in the Subversion logs,
so you can just grab it by doing a simple Subversion log check, like the following:

```bash
svn log --limit 5
```

Like I mentioned before, this is by no means the perfect solution. But there were a ton of constraints here, and I 
think we chose the best solution. Also, it should have been painfully obvious, to just let each of them manage the 
files independently. Of course, it could just be painful. Whatever. If it saves someone else a couple of hours, then 
this article was worth writing.

## Update (11/6):
I got a nice message from the SubGit developers letting me know that since v2, you only have to have admin access to
the git repo to get a two-way Git-SVN mirror. Still wasn't an option for us, but helpful nonetheless. Might be useful
in your situation.
