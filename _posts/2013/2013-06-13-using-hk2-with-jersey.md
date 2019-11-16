---
layout: post
title: Using HK2 with Jersey (with auto-scanning!)
date: 2015-06-03 12:00:00 -0500
description: Using HK2 with Jersey (with auto-scanning!)
img: 2014/cogs.jpg
tags: [java, spring]
---

## Overview
HK2 has been an interesting ride. For the most part, if anyone asks, I'm still going to suggest Spring for Dependency Injection, because the documentation is a thing of wonder. Plus, Spring Inversion of Control (IoC) and Aspect Oriented Programming (AOP) are the wheelhouse that makes all of the other Spring stuff possible.  However, there are some situations where using these technologies are requested/required, so it's good to know how to use them.
<h2>Understanding Dependency Injection</h2>
Dependency Injection is a great way to decouple your code from the implementation.  For example, if you create an interface in your core program, and you can leave the implementation for creation in a different library.  How is that useful?  One example of this would be for database access.  If you create a simple interface, like the following:

{% highlight java %}
/**
 * Saves a document in the data store.
 */
public interface DocumentSaver {
    public void save(Document)
}
{% endhighlight %}
Now, use this interface in some form of implementation. This should provide a simple passthrough implementation usage of the interface:
{% highlight java %}
public class DocumentStorage {
    final DocumentSaver documentSaver;
    
    public Storage(final DocumentSaver documentSaverIn) {
        documentSaver = documentSaverIn;
    }
    public void save(final Document document) {
        documentSaver.save(document);    
    }
}
{% endhighlight %}
You can then make two different implementations that function very differently, and put them in separate jars.

The first could access a database, such as <a href="http://www.postgresql.org/" target="_blank">PostgreSQL</a>:

{% highlight java %}
public class PostgresDocumentSaver implements DocumentSaver {
...
}
{% endhighlight %}

The second implementation could be a <a href="http://www.mongodb.com/" target="_blank">MongoDB</a> implementation:

{% highlight java %}
public class MongoDocumentSaver implements DocumentSaver {
...
}
{% endhighlight %}

Now for the interesting part... You want it to be able to change at runtime. So your customer can easily change and use PostgreSQL or MongoDB with ease. Heck, they can even add a Redis store with ease and without having to recompile a single line of code. It seems like magic, but it's not. It's just smart decoupling.

## Using Dependency Injection with Jersey
Jersey, by default uses HK2 (aka Hundred Kilobyte Kernel) for Dependency Injection. This was developed by Oracle for the <a href="https://glassfish.java.net/" target="_blank">Glassfish Application Server</a>.  HK2 follows the the <a href="https://jcp.org/en/jsr/detail?id=330" target="_blank">JSR-330 specification</a> entirely.  What does that mean? It means that this library can be swapped out for another with ease.  So, if you develop with it, just remember that you can swap it out later.  Unfortunately, with Jersey, they are using HK2 for Dependency Injection, so you are forced to either use it, or bridge it with the <a href="https://hk2.java.net/spring-bridge/" target="_blank">Spring Bridge</a> or <a href="https://hk2.java.net/guice-bridge/" target="_blank">Guice Bridge</a> (there may be others, but those are the most popular DI libraries right now).

So, regardless of which one you use (HK2, Spring, Guice, etc), you should use be using the standardized JSR-330 annotations.  These are as follows:
<table class="crayon-table">
<tbody>
<tr>
<th>JSR-330</th>
<th>Description</th>
</tr>
<tr>
<td>@javax.inject.Contract</td>
<td>Annotation to identify interfaces that match a component</td>
</tr>
<tr class="alt">
<td>@javax.inject.Service</td>
<td>Annotation to identify components that can be injected - used for scanning</td>
</tr>
<tr>
<td>@javax.inject.Inject</td>
<td>Inject an instantiated class into an placeholder variable or method</td>
</tr>
<tr class="alt">
<td>@javax.inject.Named</td>
<td>Differentiate between different objects of the same type</td>
</tr>
<tr>
<td>@javax.inject.Qualifier</td>
<td>Used for annotating new annotations (<a href="http://javanuggets.blogspot.com/2012/04/named-annotations-are-evil.html" target="_blank">because named annotations are evil</a>)</td>
</tr>
<tr class="alt">
<td>@javax.inject.Scope</td>
<td>By placing this annotation, you can tell the injector to retain the instance for possible reuse in a later injection</td>
</tr>
<tr>
<td>@javax.inject.Singleton</td>
<td>Since HK2 defines that everything is a Prototype, this is necessary for a Singleton instance. Please note, this doesn't apply when using the @Service annotation (which you should be using most of the time anyways), which is a singleton</td>
</tr>
</tbody>
</table>
So, how would we go about annotating these classes for JSR-330? First, identify your interfaces. For a simple example, your interface should be adjusted to look like this:
{% highlight java %}
/**
 * Saves a document in the data store.
 */
@Contract
public interface DocumentSaver {
    public void save(Document)
}
{% endhighlight %}
Next, annotate your implementation classes.
{% highlight java %}
@Service
public class PostgresDocumentSaver implements DocumentSaver {
...
}
{% endhighlight %}
The second implementation could be a <a href="http://www.mongodb.com/" target="_blank">MongoDB</a> implementation:
{% highlight java %}
@Service
public class MongoDocumentSaver implements DocumentSaver {
...
}
{% endhighlight %}
This will tell your program that if it sees the interface DocumentSaver being used with the @Inject, it will create the class identified with the @Service

Lastly, we need to identify where you need these and apply the @Inject annotation. I advise people to use constructor injection, which ensures all mandatory properties have been satisfied, and it is simply not possible to instantiate an object in an invalid state. Plus, it's significantly easier to test this way. Here's the augmented DocumentStorage class, identified with @Inject.
{% highlight java %}
public class DocumentStorage {
    final DocumentSaver documentSaver;
    
    @Inject
    public Storage(final DocumentSaver documentSaverIn) {
        documentSaver = documentSaverIn;
    }
    public void save(final Document document) {
        documentSaver.save(document);    
    }
}
{% endhighlight %}
Now, depending on whether you are going to use PostgreSQL or MongoDB, you adjust the classpath accordingly. Now, when the system sees the PostgresDocumentSaver class on the classpath, it will save to Postgres, and when it sees MongoDocumentSaver on the classpath, it will save to MongoDB. With something like Maven, you can swap out a dependency jar.

## Using HK2 for Dependency Injection
So, when using Spring, you can use the the <a href="http://www.mkyong.com/spring/spring-auto-scanning-components/" target="_blank">auto-scan</a> function which automagically wires these classes on the classpath together at startup.  HK2 isn't quite as easy to work with.  It needs a serialized map of interfaces and services to figure out what to use.  This is done via the <a href="https://hk2.java.net/inhabitant-generator.html" target="_blank">Inhabitant Generator</a>.  Following <a href="https://hk2.java.net/inhabitant-generator.html" target="_blank">these instructions</a>, you should probably generate them on the fly using your build tool, such as Gradle or Maven.  This will put a file in the META-INF/hk2-inhabitant folder.

If you have a simple application, you can use the following to scan all of these files and then:

{% highlight java %}
ServiceLocator locator = ServiceLocatorUtilities.createAndPopulateServiceLocator();
{% endhighlight %}

and then you can automatically get services with this bit of code:

{% highlight java %}
DocumentSaver myService = locator.getService(DocumentSaver.class);
{% endhighlight %}

However, with Jersey, the ServiceLocator has been created and populated already, which means that it gets a little complicated. To remedy this, make the following classes:

{% highlight java %}
public class JerseyAutoScan {
    final ServiceLocator serviceLocator;
    final ServletContext servletContext;

    public JerseyAutoScan(final ServiceLocator serviceLocatorIn, final ServletContext servletContextIn) {
        serviceLocator = serviceLocatorIn;
        servletContext = servletContextIn;
    }

    public void scan() {
        try {
            DynamicConfigurationService dcs =
                    serviceLocator.getService(DynamicConfigurationService.class);
            Populator populator = dcs.getPopulator();

            populator.populate(new JerseyDescriptorFinder(servletContext));
        } catch (IOException e) {
            throw new MultiException(e);
        }
    }
}
{% endhighlight %}

{% highlight java %}
public class JerseyDescriptorFinder extends ClasspathDescriptorFileFinder {

    final ServletContext servletContext;

    // private struct for saving output of Java 8 lambda
    private class UrlMapResult {
        final InputStream inputStream;
        final IOException ioException;

        public UrlMapResult(InputStream inputStreamIn,  IOException ioExceptionIn) {
            inputStream = inputStreamIn;
            ioException = ioExceptionIn;
        }

        public InputStream getInputStream() {
            return inputStream;
        }

        public IOException getIoException() {
            return ioException;
        }
    }

    JerseyDescriptorFinder(final ServletContext servletContextIn) {
        servletContext = servletContextIn;
    }

    @Override
    public List findDescriptorFiles() throws IOException {
        //this section will read through all of the JARs for inhabitant files
        final Enumeration metaInfUrls = this.getClass().getClassLoader()
                .getResources("META-INF/hk2-locator/default");
        Collection urls = new ArrayList&lt;&gt;();
        urls.addAll(Collections.list(metaInfUrls));

        // this section will search through the WAR for inhabitant files - it needs to access the servlet for this
        URL webInfUrl;
        if (servletContext != null) {
            webInfUrl = servletContext.getResource("/WEB-INF/classes/hk2-locator/default");

            LOGGER.debug("web-inf locator: {}", webInfUrl);

            if (webInfUrl != null) {
                urls.add(webInfUrl);
            }
        }

        // open the descriptor files
        List mapResults = urls
                .stream()
                .map(this::openStream)
                .collect(Collectors.toList());

        //return everything that had no errors - you might want to at least log the errors
        return mapResults.stream()
                .filter(x -&gt; x.getIoException() == null)
                .map(UrlMapResult::getInputStream)
                .collect(Collectors.toList());
    }

    private UrlMapResult openStream(final URL url) {
        InputStream inputStream = null;
        IOException ioException = null;
        try {
            inputStream = url.openStream();
        } catch (final IOException e) {
            ioException = e;
        }

        return new UrlMapResult(inputStream, ioException);
    }
}
{% endhighlight %}

These classes will allow you to read in inhabitor files and add them to the existing serviceLocatory. Finally, create your Jersey Application by extending the ResourceConfig:

{% highlight java %}
@ApplicationPath("/services/")
public class ApplicationConfig extends ResourceConfig {

    /**
     * Sets up all of the standard features.
     */
    @Inject
    public ApplicationConfig(final ServiceLocator serviceLocator, final ServletContext context) {
        setApplicationName(ApplicationConfig.class.getSimpleName());

        new JerseyAutoScan(serviceLocator, context).scan();

        // preload the LogicGraphClassifier to bootstrap the database
        serviceLocator.getService(LogicGraphClassifier.class);

        // Register Features allowing for Multipart file uploads
        //register(MultiPartFeature.class);
        //register(JacksonFeature.class);

        // Enable Tracing support.
        property(ServerProperties.TRACING, "ALL");

        // Scans the package indictated for rest resources
        packages("com.github.jlgrock.application.services");

        // Place to manually bind objects, in the case that the Jersey Auto-scan isn't working
        // e.g. bind(x.class).to(y.class);
        //
        // note: if the object is generic, use TypeLiteral
        // e.g. bind(x.class).to(new TypeLiteral&lt;InjectionResolver&gt;(){});
        //
        register(new AbstractBinder() {
            @Override
            protected void configure() {


            }
        });
    }
}
{% endhighlight %}

And Voila! It will automatically scan all of your dependencies and the current WAR for inhabitor files to populate. For anything that you are having issues with, use the "register(...)" section of the ApplicationConfig class to manually bind classes.
