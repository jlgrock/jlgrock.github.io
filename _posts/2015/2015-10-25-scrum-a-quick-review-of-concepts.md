---
layout: post
title: Scrum - A Quick Review of the Concepts
date: 2015-10-25 12:00:00 -0500
description: Scrum - A Quick Review of the Concepts
img: 2015/1160561_digital_dreams.jpg
tags: [agile]
---

## Introduction
The goal of this article is not to reiterate what a bunch of other professional Agile Management coaches have already said, but rather to put all of the pieces onto one page.  Should you want to know more about these concepts, please feel free to Google them further, and you will find a plethora of information regarding each one and the arguments over the idiosyncrasies of the interpretation of each definition.  I'll leave that to you to discuss further on forums and chats.  However, this should provide most folks with a quick ramp-up on Agile methodologies. Please use this as more of a reference

## A Quick Video
If you've never done any Scrum work before, I suggest you watch this 10 minute video to get a quick overview.
<iframe width="560" height="315" src="https://www.youtube.com/embed/XU0llRltyFM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Roles
There are many different types of people involved in the Scrum process, and this is the main way that you should think of them as how they relate to the Scrum process as a whole.
* **Project Manager** - a leader, decision maker, planner, and someone who manages the client expectations.  The person who makes sure that everyone is on time, and works well in the company dynamic.  In most senses, this is what you’d think a manger is in any other setting.  This person manages deadlines and determines whether or not you are going to make requirements.  The fine difference is that, in an Agile environment, this person should not be assigning out tasks.  The worker should be good enough to do this themselves.  Also, it is common for a manager to try and get information regarding how much time it might take to complete a task or epic, but this should be determined by the Team Velocity.
* **Product Owner** - The person in charge of priority as they are the one that will be ultimately receiving the end-product.  This doesn’t have to be the customer, but can be someone who represents the customer and shares the vision of the customer.
* **Stakeholder** - A person that has wants/desires for features and provides this input to the Product Owner.  Ultimately, the only one giving direction must be the Product Owner though.
* **Scrum Master** - This is a mediation role to coach and facilitate the agile process.  In a perfect world, this person is not part of the project.  This is NOT a Project Manager by another name, nor a lead developer by another name.
  * Makes sure that the Team and the Product Owner have prepared for Spring Planning.
  * Makes sure that the Scrum moves along quickly, making sure that everyone participates and that details not related to the primary information
  * Make sure that Workers have committed to the stories in a particular Sprint, as this is what they are promising that they can complete within a given time period.
* **Team** - The people that is in charge of completing tasks.  They are often Programmers, Testers, and Documenters - as well as a number of other possible roles.  It is not required that all of these resources be dedicated, but they will be involved in meetings, so don’t spread them out too thinly.

## Meetings
Scrum tries to keep the meetings to a minimum, but there's a lot of different types and they have to be done quite often. Just remember, it is an iterative cycle and there is a lot to do at the beginning and at the end.
* **Story-Writing Workshop** - This should be done after a large requirements gathering session, or if internal, on a set schedule (quarterly, for example).  This should be a smaller meeting with folks that understand the product well.  You use this to brainstorm interesting ideas with the staff and users to figure out what features might be desired.  In this meeting, you want to create a number of high level Epics or User Stories.
* **Product Backlog Grooming/Refinement** - An optional meeting, usually near the end of an Iteration or Sprint, to work with the Product Owner to determine task priority, close out Epics or User Stories that are no longer desired/applicable, and refine the acceptance criteria. Also, you should start breaking Epics into User Stories.  Ideally, should be done before every Iteration.  This does not require participation of the whole team - only the Product Owner and key individuals from the team need to be involved in this.
  * **Planning Poker** - This should be done after a story-writing workshop or during a backlog grooming to determine the relative level of effort for epics/stories so that the Product Owner can prioritize them.  Obviously, the sooner that you can apply level of effort numbers, the sooner that this can be added into a Sprint.  If you are a local team, you can purchase a deck of cards to do this with your team.  If not, there are online tools that you can use so that you can vote.   This number can follow a number of different scales, but I prefer Fibonacci values (0,1,2,3,5,8,13,...).  If it is greater than the Sprint Velocity, the User story needs to be broken up into multiple stories.  In this meeting, the following steps will be taken.  For each issue, the team should
    * discuss why it is simple/complex
    * Team members then choose a number value indicating the relative level of effort (NOT TIME).
    * Team members then show the number to the group at the same time so that others do not influence their opinion
    * Team members should discuss their reasoning behind values, especially if there are discrepancies, until all team members agree upon a value.
* **Sprint Planning** - This is a very long meeting.  The longer your Sprint is, the longer your Sprint planning is.  You should try and time-box this meeting to 4-hours per two week period.  Everyone must be at this meeting.  This meeting consists of multiple phases:
    * Verify Sprint Duration - Make sure that there is no change in the expected Sprint duration.
    * Give your Sprint a Title - This is an optional phase that helps you to determine the goal for the Sprint and what the target backlog should be.
	* Select Target Backlog for Sprint - Determine, based on the current Velocity and the estimation of User Story level of effort, how many User Stories can be accomplished.  The Product Owner and the entire team must agree to what can be accomplished with the current resources.
	* Clarify Requirements - have the Product Owner present each item and let the whole team discuss it in detail.  Make sure the story title follows the expected title format.  Attach as many details to the User Stories is as possible, making sure that the requirements are lightweight and visual.
	* Set the Sprint Budget - determine who will be available for the Sprint and the expected hourly contribution to determine how many hours will be allowed for Tasks
	* Break Requirements for each User Story into associated Tasks.
	* Estimate the number of Tasks in Hours, making sure that the entire team agrees.
	* Commit to the Sprint Backlog - make sure that everyone agrees that they can get the work completed in the allotted time, as it is everyones responsibility to get this completed in a Sprint or explain why it could not be achieved.
	* Identify Stretch Tasks - In the event that the team under-commits/over-estimates, these are tasks that people can do should the team finish all of their other tasking.
* **Daily Scrum** - An optional meeting, moderated by a Scrum Master, in which every team member should give a status update on their current progress.  Some people are working so closely that this is not necessary, others require this. This meeting should be extremely time-boxed, the suggested time is to limit it to 15 minutes.  It is also suggested that everyone remain standing during this meeting (and thus is commonly called a “standup” meeting) to guarantee that nobody gets too comfortable - again, to encourage the strict time restrictions.  Should there be specific questions that may take time, it is suggested to continue these after the Scrum meeting as to include only the minimum amount of people - this should be enforced by a Scrum Master. The following questions should be answered during every standup (at minimum):
    1. What did I work on yesterday?
	2. What will I be working on today?
	3. Do I have any blockers?
* **Sprint Review** - The product owner and key members of the team must be at this meeting.
* **Sprint Retrospective** - A short meeting used to help a team evolve/improve.  Everyone should be at this meeting.  This meeting is usually under an hour, in which people can discuss Lessons Learned and what to improve. The three key questions/points of discussion should be:
    * What went well during the sprint cycle?
	* What went wrong during the sprint cycle?
	* What could we do differently to improve?

## Domain Objects
At this point, there are a number of Agile/Scrum concepts that you should know, in general. Unfortunately, this gets muddled - mainly because there are a bunch of software systems that try to do all forms of Agile in a very generic way, and they all try to cook up their own custom versions of these objects to make them more generic (we'll just call that fitting a square peg into the round hole). So, please forgive me if some of these have multiple names.
* **User Stories** are the piece of functionality (feature + value added) that the client wants.
    * It is rare that a User Story is completed by one person. Usually, software systems require that a single person be responsible for a user story so that it may be owned and completed.  However, the entire team is responsible for the completion of said task.
    * Each story must contain:
        * The title should be a short description in the format “As a [customer role] I want [feature] so that [benefit]”.  For example, “<i>As a</i> commercial advertiser <i>I want</i> to have filtering options for the primary list <i>so that</i> I can retrieve the records faster"
        * customer role - the type of person that wants the features.  This should be more specific than “user” in most cases.  It identifies your audience and security level.  At no point ever should this be “developer”, as stories are to bring business value to customers and this usually indicates Technical Debt.
	    **feature** - a simple and short description of what you want to do
	    * benefit - the reason that it is wanted.  This should identify the business value/benefit for the customer.  Why does a commercial advertiser need to have filtering options?  What is he trying to achieve?
	* Should contain an estimate the relative level of effort that every person on the team agrees with (this MUST not be put in by one individual - but done during Sprint Poker).
	* During a Sprint Planning, a User Story should be broken down into multiple tasks
	* Until all tasks are marked as completed, this user story should not be marked as completed
* **Epics** are just a special kind of User Story, typically too large to fit into a single Iteration.  It's great when you don't want to break it up into multiple User Stories yet or where requirements are fuzzy.  In some software systems these are put in as separate objects so it is even easier to identify them.
* **Acceptance Criteria** - So important that this is broken out as its own object.  This should be:
    * Independent - minimal dependencies
	* Normalized - small and can be completed in less than a week
	* Testable - You should be able to meet the acceptance criteria by providing some proof
* **Tasks** - User stories are broken into tasks.
    * This is a specific thing that needs to be completed to achieve a user story.  There are usually many tasks that need to be completed for a user story.
    * This should be achievable within a small amount of time (ideally less than a day), otherwise the tasks should be broken up more.
    * Once a user story is broken into tasks, it should be estimated into the number of estimated hours that it will take to complete a task.  Please note that this has no relation to the level of effort defined in the User story.
    * Tasks should be stated as deliverables, if at all possible, as these are measurable.
* **Stretch Task** - A task to be completed, in the event that all of the other User Stories have been completed.  These should be created during a Sprint planning and added as the lowest priority items.  These tasks should not be considered part of the Sprint Commitment.  These are handled very differently by different systems, so you might have to get creative in how you add them to your Sprint Backlog.
* **Bug/Defect** - Technically, this isn't considered part of the original definition of Agile.  It's just not covered, really.  There are several ways of handling this - and it's different depending on the software you use to handle it.  Most software, though handles it this way: A bug is the same as a story, for the reasons described <a href="https://www.mountaingoatsoftware.com/blog/bugs-on-the-product-backlog">here</a>.  Whether to give it a level of effort estimate is also under debate, as technically a User Story brings business value, and a Bug is more like Technical Debt than a User Story.  I'd suggest just to treat it like a Task and giving it a Task Hour estimate. Put it in the system however it is possible (as a floating Task or under a User Story), and let the Product Owner determine the priority.
* **Product Backlog** - The wish list that the customer wants for the foreseeable future.  This should be in the form of a priority-ordered list of features, represented by Epics or User Stories, that the Product Owner or Team member would like to have completed for the product.  Everyone on the team should be encouraged to put in new stories, which can be reviewed/prioritized at a later point.
* **Release Backlog** - Assuming the Project Management [Iron Triangle](https://en.wikipedia.org/wiki/Project_management_triangle) (and assuming a fixed budget), a release should either be defined by an expected time or a feature set, not both.
    * Should you choose time, this is simply picking the most recent stable product produced by a Sprint and calling it a release.
	* In the event that this is based on a feature set (sometimes known as Milestone Releasing), this is the wish list that the customer wants in a particular release and a subset of the product backlog.  Once all of the features in said backlog are completed, the product produced at the end of the Sprint are used.
* **Sprint Backlog/Commitment/Goal** - The Sprint Backlog is the priority-ordered list of User Stories that the team and product owner have committed to finishing within a Sprint.  If this is decided ahead of time or if you are being told by a Project manager what you will have done by the end of the Sprint, you are not following an Agile approach, you are following a Waterfall methodology.
* **Technical Debt** - These are special User Stories that are collections of any technical shortcuts made to meet delivery deadlines.  This is NOT desired architectural changes or new features.  These should be placed into the product backlog, as either User Stories or Tasks.  This should also be prioritized just like any other User Story/Task.  Examples of kinds of technical debt: http://martinfowler.com/bliki/TechnicalDebtQuadrant.html.  These are handled very differently by different systems, so you might have to get creative in how you add them to your Sprint Backlog.
* **Sprint** - The act of a single team planning a Sprint Backlog, working to meet the acceptance criteria for the User Stories/Tasks in a single Sprint Backlog.  At the end of every sprint, the product must be delivered in a production-ready state (or as close to that is as is necessary).
* **Iteration** - Usually an iteration refers to a Sprint or a Release in Scrum (depending on the context).  Some people like more fine grained control by breaking up a Sprint or Release into smaller pieces.  For example, the Team will spend one 2-week iteration developing Java and two 2-week iterations developing JavaScript, making a Sprint that is a total of 6-weeks.  Or, another example, we do one iteration that consists of 4 2-week Sprints for Development and another that consists of 2 2-week Sprints for Testing, making a Release that is a total of 6 Sprints long.  This is not part of Agile, but it has annoyingly found its way into some software.
* **Sprint Duration** - This should be a consistent time period so that it is possible to get good average Velocity estimates.
* **Sprint Budget** - This is the number of available hours that the team has to work on a Sprint.  Every Sprint is not the same. Contractors become unavailable, people go on vacations, holidays occur, medical emergencies happen.  Try your best to figure out how many hours you have to work with in the Sprint.
* **Velocity** - The running average of the last n-Sprints (where n is decidedly long.  I usually use 4-Sprints).  This gives you a general idea of what kind of level of effort you can fit into a single Sprint.
* **Done** - The accepted checklist of criteria for marking a User story as Complete.  This should contain several of the following: Code Produced, Architecture reviewed, Peer reviewed, Compiles, Unit Tests written with x% coverage, Deployed to System Test environment, passed User Acceptance Testing (UAT), relevant documentation updated, all task statuses updated, all task hours updated

## Further Reading
Since I am well aware that I just breezed through so many topics that it is hard to figure out which way is up, I'm going to leave you with further reading. The best description of the process that I've found is at a [this website](http://www.allaboutagile.com/how-to-implement-scrum-in-10-easy-steps/). It provides a great walkthrough of an iteration, and my favorite part - It's written for the layman. Nothing too theoretical here. I much prefer the concrete to the abstract when it comes to my engineering responsibilities.
