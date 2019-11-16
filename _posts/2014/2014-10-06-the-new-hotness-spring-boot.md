---
layout: post
title: The New Hotness - Spring 4's Spring Boot
date: 2014-10-06 12:00:00 -0500
description: The New Hotness - Spring 4's Spring Boot
img: 2014/fire.jpg
tags: [technology]
---

The guys who make the Spring framework libraries are no slouches.  They know the ups and downs of their own framework, as well as Java as a whole.  They are also on top of all of the newer JVM technologies, such as Groovy, Scala, Gradle, Spock, etc.  Heck, if they weren’t making money hand over fist, I’d think they would be great core language developers.  The would progress the language to a point that I’d love using it again.

The reason I say all of this is because the developers of the Spring framework realized that there are a couple other frameworks out there (Ruby on Rails, Grails, Django, etc.) that favor convention over configuration.  Meaning, I don’t want to have to set up 50 XML files to configure a project just so that I can get it running as a simple web service.  It shouldn’t be that complicated.  Spring 4 has some answers for you.  Spring introduced Spring Boot, a group of annotations that will favor convention over configuration… at least until you need to change it to something more complicated. The way it acts, I think they may have backported some of the stuff they did for Grails right into Java.

## The Code

<blockquote>All of this code has been laid out at <a href="https://github.com/jlgrock/springboot-example">an example on Github</a>, but this article includes all of the code you need to get started.</blockquote>

The way that they accomplished this is by creating a number of libraries that have the name `spring-boot-starter-*`.  There’s about 30 of them that you can mix and match to get your technology stack.  For example, if I want to make a stack that has Spring-IOC, Spring-MVC, and MongoDB support, I just use add the following libraries to my Gradle dependencies like this:

`build.gradle`
{% highlight groovy %}
// this section loads the spring plugins
buildscript {
    dependencies {
        classpath(group: "org.springframework.boot", name: "spring-boot-gradle-plugin", version: "1.1.7.RELEASE")
    }
}

// this plugin runs to use the latest version of all spring libraries and provides additional 
// functionality to the gradle “run” task that is added by java/groovy/scala/etc
apply plugin: 'spring-boot’
apply plugin: ‘java'

dependencies {
    compile(
           [group: "org.springframework.boot", name: "spring-boot-starter"],
           [group: "org.springframework.boot", name: "spring-boot-starter-web"],
           [group: "org.springframework.boot", name: "spring-boot-starter-data-mongodb"],
          
           // need to add for @ComponentScan
           [group: "org.springframework", name: "spring-context" ],
    )
}
{% endhighlight %}

To start the application, create an entry point for the application:
`Application.java`
{% highlight groovy %}
@Configuration
@EnableAutoConfiguration
@ComponentScan
public class ExampleApplication {
    private static Log LOGGER = LogFactory.getLog(ExampleApplication.class);

    public static void main(String[] args) throws Exception {
        LOGGER.info("Starting Example class.");
        SpringApplication.run(ExampleApplication.class, args);
    }
}
{% endhighlight %}
Now, if you want to create a domain object, just put it together like the following:

`User.java`
{% highlight groovy %}
public class User {
    @Id
    private String id;

    @NotNull
    @Size(max = 40)
    private String name;

    public User() {
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setName(String name) { this.name = name; }

    public String getName() {
        return name;
    }
}
{% endhighlight %}

I would suggest following convention (like Grails does) and drop it in a folder called "domain" to keep it separate from the controllers, services and views.

Next, you want to create the "findBy*" functions (like GORM does in Grails - you seeing a trend here?). To do this, create an interface that extends the Repository.  In this case, it's the MongoRepository (you can use other ones for the JPA/Hibernate stuff, but the idea is the same):

`UserRepository.java`
{% highlight groovy %}
// Generic type follows the form 
public interface UserRepository extends MongoRepository<User, String> {
    public User findByName(String name);
    public List findAllByName(String name);
}
{% endhighlight %}

The cool part is you don't have to make the implementations!  That's awesome, right?  This is already taking some of the pain out of writing a web app.

Next, you are going to want to build the controller.  I put a simple one together that adds, removes, and gets the user object:

`UserController.java`
{% highlight groovy %}
@RestController
@RequestMapping("/user")
public class UserController {
    private static Log LOGGER = LogFactory.getLog(UserController.class);

    @Autowired
    private UserRepository repository;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public @ResponseBody User getUser(@PathVariable final String id) {
        final User user = repository.findOne(id);
        return user;
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public Map<String, String> addUser(@RequestBody @Valid final User user) {
        repository.save(user);
        return new HashMap<String, String>() { {
            put("id", user.getId());
        } };
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deleteUser(@PathVariable final String id) {
        repository.delete(id);
    }
}
{% endhighlight %}

And that's it!  You've got a working webapp that, when you run 'gradle run' will spin up a Tomcat instance, connect to your localhost MongoDB (if you don't have one, you can install it with `brew install mongodb` or `ports install mongodb`.  Test away!

## What next?
I know what you are thinking... well, how is that going to help me?  I don't run everything off of my own machine.  There is a Tomcat server already and a databases out there.  No worries, they made this easy too.  To fix any config that you don't like, you just change the configuration.  An example of this would be to swap out the configuration to point to a different mongoDB instance. To do this, change

{% highlight groovy %}
@EnableAutoConfiguration
{% endhighlight %}

to

{% highlight groovy %}
@EnableAutoConfiguration(exclude = {MongoRepositoriesAutoConfiguration.class})
{% endhighlight %}

Next, create a class like the following:

`AppConfig.java`
{% highlight groovy %}
@Configuration
public class AppConfig {
    @Bean
    public MongoFactoryBean mongo() {
        MongoFactoryBean mongo = new MongoFactoryBean();
        mongo.setHost("127.0.0.1");
        mongo.setPort(27017);
        return mongo;
    }
}
{% endhighlight %}
So you see, I excluded it from the automatic configuration, then customized it. I did this because the @Configuration tells the application to use this class as a configuration class, meaning that it will look for any configuration beans below it. If you don't like this method, you can use the application-context XML as well, but that will be for another article. So with that, you've pointed it to another server for the database. Now, we want to put this as a package. To do that, just do it like you would always do it. In Gradle!

Just add the following to build.gradle:

{% highlight groovy %}
apply plugin 'war'
{% endhighlight %}

Now, you can type 'gradle war' and it will build a war with all of your spring dependencies, ready for deployment.

## Try It Out
OK, I'm not so mean as to actually force you to code this yourself. If you want to give it a try, go ahead and clone a couple of my repositories and tweak them. [The first one](https://github.com/jlgrock/jsonp-example) is a simple web service that just wraps json responses in a function callback if you include the url parameter "callback" (really useful technique in avoiding [Same-Origin Policy](http://en.wikipedia.org/wiki/Same-origin_policy) problems). [The next one](https://github.com/jlgrock/springboot-example) is the web service that you can create with these code snippets.  Go ahead and try to configure that to hit a different mongoDB server or swap it out for JPA.

## Summary
So, in my opinion, the naming of the packages to contain the word "starter-*" is a misnomer. If you don't need more than the defaults, then you don't ever need to switch from these packages. My opinion is that this should be what everyone uses to make their project (assuming they are using Spring). It just makes it so easy, that you'll feel less like you are creating monotonous overly decorated classes and more like you are cooking with fire again.

## Additional Reading Material
If you want a more detailed JPA example, check [this guy's blog out](http://kielczewski.eu/2014/04/developing-restful-web-service-with-spring-boot/).  It's a good recount of more code that's very common.  Also, the best reading material is [the core docs](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/), which are very helpful, though, they do expect you to know quite a bit about Spring already, as they don't want to explain all 30 of modules to you.  For that, you'll have to dive in to the ones that are applicable to you.
