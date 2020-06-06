---
layout: post
title: Making the Maven Version and Subversion Version Match
date: 2012-09-13 12:00:00 -0500
description: working with two different version control systems is painful.  Here's a way to do it, if you have to.
tags: [testing]
---

# Unit Testing Primer

I had realized I had covered some [Basics of Java Testing](/2012/2012-05-15-testing-in-java) in a thread almost a 
decade ago (and they still work)
 
## Why To write Unit Tests?
First off, let's dispel a myth.  The goal of unit tests is **not** to show if your code works.  It’s to make sure 
it meets requirements and continues to work, long after you are gone.

## Testing Methodologies
### Test Driven Development (TDD)
The general idea of TDD is to write the tests to the requirements, then write the code to the tests.  Vital to agile 
development methodologies.

https://en.wikipedia.org/wiki/Test-driven_development

### Behavior Driven Development

https://en.wikipedia.org/wiki/Behavior-driven_development

## Models of Unit Tests
Most follow the AAA Model - Arrange, Act, Assert.  Similar patterns exists called Data Driven Testing, which use the 
terms - Given, When, then/expect.  Some frameworks forcibly divide these (see Spock Testing, for a good example).  
These all basically mean the same thing, set your environment, make an action, test that the action did what was 
expected.


## Isolating your Tests
The hardest part, by far, is isolating your test so that a single unit test can tell you exactly
where the code has broken.

### Doubles, Fakes, Mocks, and Stubs

Kinds of objects to use to isolate your tests - Doubles, Fakes, Mocks, and Stubs
https://blog.pragmatists.com/test-doubles-fakes-mocks-and-stubs-1a7491dfa3da

Value vs State vs Interaction Testing
http://www.natpryce.com/articles/000342.html
https://fitgeekgirl.com/2017/10/22/value-based-vs-state-based-vs-interaction-testing/

## Integration Testing


## Good Primer Video
https://www.youtube.com/watch?v=NPp2pvhGbkM