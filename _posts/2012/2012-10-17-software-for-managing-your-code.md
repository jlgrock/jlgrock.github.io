---
layout: post
title: Software for Managing Your Code
date: 2012-10-17 12:00:00 -0500
description: A simple primer on a bunch of the tools used in version control, build tools, build management, and binary repository.
tags: [javascript]
---

As Computer Engineering progress, it is foraging a new path in the world.  Companies that used engineers in the past, such as the automotive and aviation industries, have been focused on figuring out why the world is changing so quickly around them.  Computer engineers are forcing this change due to the fact that they are doing things faster and requiring much more transparency than ever before for products to be successful.

The eclipse development teams have been paying attention to this as well.  Mike Kerston covers how Eclipse is taking this problem head on at EclipseConn.  The video below also covers some of the common threads in the open and closed source communities at present.  Definitely a good watch.  Even if you don't want to watch the whole thing, everyone should be adopting these tools (or an acceptable alternative) into any new project going forward, and if possible, retrofitting older projects to use this as well.

[Git](http://git-scm.com/) and [GitHub](https://github.com/) - IMO, The hands down best from of Source Code Management (SCM) out there.  This is specifically a [Distributed form](http://en.wikipedia.org/wiki/).  Please ditch [Subversion](https://subversion.apache.org/).  It was incredible for its time, but we have moved on.
[Mylyn](http://www.eclipse.org/mylyn/) / [TaskTop](http://www.tasktop.com/) - Task Management tools, very useful for a developer or a PM.  Mylyn can track your time and the files you are working for for particular task (and so much more).  TaskTop is a tool which you can purchase that works on top of Mylyn and provides you with a bunch of tools, which are just plain awesome for any freelancer.
[Bugzilla](http://www.bugzilla.org/) / [JIRA](http://www.atlassian.com/software/jira/overview/) - BugZilla is open source and needs to be hosted, JIRA is closed source and hosted for you (which is free for open source project only).  Either one provides you with a solid way of tracking user stories and bugs.
[Hudson](http://hudson-ci.org/) / [Jenkins](http://jenkins-ci.org/) - Essentially the same thing, as they are a fork of the same codebase, these are some of the best in [Continuous Integration](http://en.wikipedia.org/wiki/Continuous_integration), and they are free (but you also have to host it).
[Gerrit](http://code.google.com/p/gerrit/) / [Crucible](https://www.atlassian.com/software/crucible/overview) - Code review tools.  Gerrit is specific to Git.  Crucible should work on Git or Subversion, but will cost you.  The upside to Crucible is you can tie it into JIRA really well.

<iframe width="560" height="315" src="http://www.youtube.com/embed/WBwyAyvneNo" frameborder="0"></iframe>