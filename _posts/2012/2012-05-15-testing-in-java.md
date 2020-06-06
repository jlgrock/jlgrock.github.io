---
layout: post
title: Testing in Java - A Primer
date: 2012-05-15 12:00:00 -0500
description: Everybody's got to test.  Might as well learn to do it properly.
tags: [wordpress]
---

# Evolution
As with everything in coding, or [STEM](http://en.wikipedia.org/wiki/Stem) in general, Java Testing is evolving.  It’s not the same as it was 3-5 years ago, and it shouldn’t be treated as such.  Keep that in mind if you are referencing this article 3-5 years from now.  Hopefully we’ll all be on Java 8 and Lambda expressions or everyone will be familiar with [Groovy](http://groovy.codehaus.org/) and [Spock](http://code.google.com/p/spock/) and will change how we test again.

For now though, I have noticed that there is no good all encompassing reference for people to start learning how to test properly, so I thought I would put a basic how to up there on using some of the current tools.

## Including testing in your project
This is going to depend on your build tools.  Most companies use Maven right now, so I’ll provide this example.  Using Gradle/Ivy/Buildr/etc., there will be an analog, but you are going to have to figure it out yourself.

The following code should be added to your pom.xml so that you have the tools available when your code is testing.  If you plan on messing with the versions listed here, make sure to reference the following chart first: [Supported Versions](http://code.google.com/p/powermock/wiki/MockitoUsage13)

```xml
	...
	<dependency>
		<groupId>junit</groupId>
		<artifactId>junit</artifactId>
	 	<version>4.10</version>
		<scope>test</scope>
	</dependency>
	<dependency>	
		<groupId>org.powermock</groupId>
		<artifactId>powermock-api-mockito</artifactId>
		<version>1.4.10</version>
		<scope>test</scope>
	</dependency>
	<dependency>	
		<groupId>org.powermock</groupId>
		<artifactId>powermock-module-junit4</artifactId>
	 	<version>1.4.10</version>
		<scope>test</scope>
	</dependency>
	...
```

## Setting up your Imports
In your newly created class, you are going to need access to some things that we’ll cover as I continue on.  For the time being, go ahead and statically import JUnit and PowerMock into your class.  This will allow you to use the static methods as if they were locally defined.

{% highlight java %}
import static junit.framework.Assert.*;
import static org.powermock.api.mockito.PowerMockito.*;
{% endhighlight %}

## Using JUnit4
I can only hope that every student out there is learning to test with JUnit or TestNG, but with the way that schools are performing these days (i.e. – a money collecting factory, with very little care for the students’ welfare), I’m going to assume that most haven’t.

At this point in time, if you are including this in your project, you have to use a flavor of JUnit 4.  There are a bunch of features added in this version that you’ll eventually want to take advantage of, and you have to watch compatibility too.

The basic structure of your test cases is as follows:
```java
public class MyClassTest {
	@Before
	public void setup() {
		//…setup code goes here…
	}

	@Test
	public void testSomething() {
		//…testCode goes here…
	}

	@Test (expected = MyException.class)
	public void testSomethingThatWillThrowAnException () throws Exception {
		//…testCode goes here…
	}
}
```

The `@Before` annotation tells JUnit to run this method **before every method**.  There is also a `@BeforeClass` annotation, should you only want this to run once before any of the methods are called.

The `@Test` annotation tells Junit that this method is used for testing (and is not some utility method).  Each of the methods marked with this annotation will be executed independently as a separate test case.  So, you will likely want to name these methods in some way that describes <strong>what</strong> you are testing.

When using the `@Test` annotation, you can also provide the “expected” attribute, which allows you to specify that you are expecting an exception to be thrown.  This should be customized to the exact exception class that you expect to be thrown (I repeat and rephrase… DO NOT use the generic Exception class).  This allows you to test when something goes wrong and you would expect an exception to be thrown.

There are more annotations and such, but these cover 90% of the use cases, so I’ll let you research the others in the references section, if you should so desire them.

##EasyMock/Mockito
Why haven’t I provided any real code examples yet?  My response: Because you won’t get very far with just JUnit these days.

Unit testing has become so important that there are ideologies based around them.  Test Driven Development (TDD) and Behavior Driven Development (BDD) are just two of them.  With any of them, the base assumption is the same.  You are doing unit testing and you should only be testing the unit you are working on.  You will be making assumptions that other parts of the system are working properly.  When you want to tie different parts of the project together, you will be doing different kinds of tests (Integration Tests, White Box Tests, Black Box Tests, etc. – you can go to the references if you want to read more about these).  For now, we are only going to focus on Unit Testing though.

So, what does that mean?  It means that you should never instantiate a class that you aren’t testing.  For example, if I am testing MyClass(), the only “new” keyword that should be used is to instantiate MyClass.  If MyClass has a constructor that takes two parameters:

```java
	MyClass(MyObj a, MySecondObj b)
```

What do I do now?  Well, as I said, you don’t create a or b.  By doing that, you’d be testing how well MyObj and MySecondObj work.  We don’t care about that.  So then what?  We Mock them.

Mocking is a tool that allows users to have the object, pass it around, and watch how it interacts with others, without actually creating the object.

How do you use it?
```java
@RunWith(PowerMockRunner.class)
public class MyClassTest {
	@Mock
	MyObj a;

	@Mock
	MySecondObj b;

	//… tests …
}
```

The `@RunWith` annotation tells it to look for annotations and preload them and the `@Mock` annotation tells it to mock your objects.  That’s it!  To help understand a little better what this library does, this tells the mocking mechanism to extends the MyObj and MySecondObj classes and passes the extended object around instead.  That way, the new spyMyObj has the same method signature as MyObj and can be treated just like it.

## Designing for Extension
Wait, what?  That’s it?  No, unfortunately not.  If you were smart enough to want to test correctly, I’m going to hope that you’ve designed for extension as well.

What is designing for extension?  This is a programming style where superclasses provide empty "hooks" that can be implemented by subclasses. The exact rule is that nonprivate, nonstatic methods of classes that can be subclassed must either be :
<ul>
 	<li>abstract or</li>
 	<li>final or</li>
 	<li>have an empty implementation</li>
</ul>
Rationale: This API design style protects superclasses against being broken by subclasses. The downside is that subclasses are limited in their flexibility, in particular they cannot prevent execution of code in the superclass, but that also means that subclasses cannot corrupt the state of the superclass by forgetting to call the super method.

Well, if you remember your Java basics pretty well, this is going to cause an issue.  Why?  As I’ve said in the previous section, Mockito extends your class.  If you’ve designed for extension, you’ve got a bunch of final or static methods so that your subclasses don’t break your code.  This means EasyMock/Mockito just isn’t going to work.

## PowerMock
Powermock to the rescue!  Powermock is a great tool that extends EasyMock and Mockito to use reflection and a custom classloader (i.e. “bytecode manipulation”) to allow EasyMock and Mockito to unfinalize these methods (but just for testing).

For each class that you have final methods on, you are going to have to “prepare” them before execution of the tests by adding them to the @PrepareForTest class annotation.  In this case, I’m going to assume that MyObj and MySecondObj both have final methods and “prepare” them:
```java
@RunWith(PowerMockRunner.class)
@PrepareForTest({MyObj.class, MySecondObj.class})
MyClassTest {
	//..mocks and tests
}
```

## More Mocking
That was easy enough.  Now for the fun part.

You understand how to prepare a class and how to mock objects.  Now the puzzle begins.  How do you test your class?

First, start off with your assumptions.  When you call MyObj, you are expecting it to return some values for use by your constructor.  Adjust your mock objects to return these values in the following way:
```java
when(composite.getProperty("fieldName")).thenReturn(“myResponse”);
```

If you are trying to return another object, you still shouldn’t return an instantiated object.  You should mock some more!
```java
@Mock
MyThirdObj prims;

@Before
public void setup() {
	when(composite.getProperty("fieldName")).thenReturn(prims);
}
```
At this point, you can adjust the mock for prims.  Continue ad nauseam.  Remember though, that each class that you are 
overriding final classes needs to be added to the prepare section.

## Assertions

Now, you have your objects doing what you want, but you need to check that your MyClass object is doing what you 
expect. in your test cases, you can use the assertion library included with JUnit.  These are assertTrue, assertFalse, 
assertEquals, assertNotEquals, assertNull, assertNotNull, assertSame, assertNotSame.  Since you’ve included these in 
your static imports, you can access any of them.

How do these work?  If the assertion holds true, it continues on.  If the assertion does not hold true, then it will 
throw an AssertionException.  The testing framework will catch this exception and tell you in your build/reporting that 
you have a test case failure.

Example:
```java
@RunWith(PowerMockRunner.class)
@PrepareForTest({MyObj.class, MySecondObj.class})
public class MyClassTest {
	@Mock
	MyObj a;

	@Mock
	MySecondObj b;

	@Mock
	MyThirdObj prims;

	@Before
	public void setup() {
		when(composite.getProperty("fieldName")).thenReturn(prims);
	}

	@Test
	public void testSomething() {
		MyClass myClass = new MyClass(a,b);
		assertEquals(‘2’, myClass.getValue());
	}
}
```
You can do as many assertions in a test as you want.  If any of them throw an assertionException, the entire test fails.

## Other Good References

For a more in depth tour of JUnit: 
[http://www.vogella.com/articles/JUnit/article.html](http://www.vogella.com/articles/JUnit/article.html)

For a more in depth tour of the different types of Testing: 
[http://en.wikipedia.org/wiki/Software_testing](http://en.wikipedia.org/wiki/Software_testing)