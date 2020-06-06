---
layout: post
title: Check if Binding Variable is defined
date: 2012-10-17 12:00:00 -0500
description: Groovy Scripting or Gradle - check if binding variable (or Gradle property) is defined
tags: [groovy, gradle]
---

In scripting, its helpful to create global variables.  It's definitely not a good idea for any form of scalability, 
obviously, but Groovy has done a good job in creating this slight separation of function.

```groovy
myBindingVar = 'checkme' //binding occurs, so that it is available everywhere
def myLocalVar = 'not useful' //this is a local variable that is only available to the local scope
String myLocalString = 'also not useful' //this is also a local variable that is only available to the local scope
```

The difference is that the following won't work:
```groovy
def myLocalVar = 'not useful' //this is a local variable that is only available to the local scope
def myFunc() {
    println myLocalVar //this will throw an error, because it is out of scope
}
myFunc()
```

but the following will work:
```groovy
myBindingVar = 'checkme' //binding occurs, so that it is available everywhere
def myFunc() {
    println myBindingVar
}
myFunc()
```

This can cause some problems in scripting if you need to either provide default values or if you need it to provide a 
better exception if the variable isn't found.

An easy solution to this is the following:
```groovy
if (binding.variables.containsKey("bindingVar")) {
    // do something
}
```
Or if you'd like to get a null value for an optional binding:
```groovy
def optVar = binding.variables.get("bindingVar")
if (optVar) {
    // do something
}
```
Similarly, when using Gradle, which is based off of Groovy, you can define one or more gradle.properties files. An 
example gradle properties would be as simple as:
```bash
myProp=checkMe
```
use the following to determine if a property is defined:
```groovy
if (gradleProject.properties.containsKey("myProp")) {
    // do something
}
```
Or if you'd like to get a null value for an optional property:
```groovy
if (gradleProject.properties['myProp']) {
    // do something
}
```
