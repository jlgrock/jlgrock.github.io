---
layout: post
title: Moving my HOA Website from Godaddy to GitHub
date: 2020-06-07 16:30:00 -0500
description: Moving my HOA Website from Godaddy to GitHub
img: 2020/jekyll_software_logo.png
tags: [jekyll]
---

## What and Why
Right now, we were using WordPress.  I decided to switch to Jekyll. Not everybody is going 
to want to figure this out, and I don't blame you.  It's nice if you have a tech guy on 
your board, but most do not.  However, there were a few main benefits that I was looking for.  
When I converted my personal website from WordPress to Jekyll, I learned these quite well.

## Benefits
The benefits are many.  Here's the short list.
* **Github is Cheap** - We're currently hosting with GoDaddy.  It's cheap enough, I'm not
going to lie.  With SSL (which is required now for browsers like Chrome), 
you're paying ~$13/month. But GitHub is cheaper.  It's literally 
free if you don't mind sharing the code to your site - which I don't.  I literally 
just served it up to you anyways.  Our site is almost static anyways.
* **WordPress is Confusing** -  WordPress is great, but it's confusing to people who 
don't know it.  There's a lot of newspaper terminology going on in there, and the 
themes usually hack the core components so that you don't know what's going on anymore.  
For example, you might have a plugin that requires you to make a menu entry or insert 
some special code somewhere in your articles for it to work.  For example, in our
site, we had detail tables, but the tables were defined in a different place and you
had to add them to an article with something that looked like `[fancytable id=5]`.
The plugin would scan the articles when deploying them.  Nobody understands that. It was 
easier for me to teach people how to put a section at the top of a text file than to use
Wordpress.
* **Security Hazard** - WordPress is the number one software in the world, and it's a program that's running.
Even if it's set to auto-update, it's still a target for 0-day vulnerabilities.  I constantly
would get attacked by bots.  I turned on some google analytics and I was getting probed 
constantly for well known WordPress issues.  If you are a 
* **Databases are a pain** - The underpinning of WordPress is a database. By default, 
CMS engines like Wordpress, Drupal, and Joomla are run off of MySQL.  Mainly because MySQL was
the first big Open Sourced Database.  At this point, PostgreSQL is my goto, but I digress...
If you have a database, you need to either have it hosted with auto-scaling, or manage it. 
Managing it is painful as you can regularly get a DDoS attack from bots to overload 
the database or get attacked with SQL attacks through plugins.  I'd rather reduce the service 
area and not use one at all.
* **Static Files can be served faster** - Jekyll is code to generate static files.  Once 
they are static, your web server 
 

## Drawbacks
With any change, comes drawbacks.
* **No fancy tools** - Without something running all the time, you can't have something that 
performs chron jobs (tasks that execute periodically without user interaction).  For example
we had the WordPress JetPack plugin that would interact with our social media.  That's 
not going to work anymore.  Luckily, there's a workaround, but it's not as integrated.
* **Tech input required** - You can't do this without a tech person that understands how
websites work.  Though, it's pretty likely your organization  didn't set up your WordPress site
without hiring a tech guy.  So there's that.   
  
## Installation
I'm on a Mac, so installing ruby is easy.  I'll give my instructions here, but for Windows users,
use [this guide](https://www.ruby-lang.org/en/documentation/installation/).

1. Make sure Homebrew is installed.
    
    ```bash
    https://brew.sh/
    ```

2. Install Ruby and Rbenv
    
    ```bash
    brew install rbenv ruby-build
    ```

3. To make sure rbenv is available to your shell (assuming bash.  If you are using zsh, feel free to modify), 
run the following:
    ```bash
    echo 'eval "$(rbenv init -)"' >> ~/.bash_profile
    source ~/.bash_profile
    ```

4. Install a decently recent version of ruby

    ```bash
    rbenv install 
    rbenv global 2.6.5
    ```

5. Install [Bundler](https://bundler.io/).  Most projects these days use bundler to manage dependencies and 
build their project. This is similar to [Maven](https://maven.apache.org/) in the Java world, for my Java friends.  
You your dependencies in `Gemfile` and when you "lock" them, it creates a `Gemfile.lock` file, which makes sure your 
dependencies don't change unless you ask them to.

    ```bash
    gem install bundler
    ```

6. Install [Jekyll](https://jekyllrb.com/docs/installation/).
    
    ```bash
    bundle install jekyll
    ```

## How I Converted Our Site
1. First, I [backed up out database](https://www.godaddy.com/help/back-up-a-database-in-my-linux-hosting-account-19976).  
You don't want to mess anything up with your tinkering.
2. [Got my ip](https://whatismyipaddress.com/) - Writing this down, because we are going to need this for the next step...
3. Went into Godaddy's CPanel and 
[Expose your database](https://in.godaddy.com/help/connect-remotely-to-a-mysql-database-in-my-linux-hosting-account-16103).
This will basically whitelist your IP address and allow your local computer to connect to the database.  By default, 
for (good) security reasons, this isn't exposed to the open internet.
4. In the CPanel, I create a new database user.  I could have used the current one, but I had no idea what the permissions
were.  If you want to do this too, use everything after the database creation from 
[this link](https://zemez.io/wordpress/support/knowledge-base/creating-mysql-database-godaddy/).
5. I created a 
[Github Organization](https://help.github.com/en/github/setting-up-and-managing-organizations-and-teams/creating-a-new-organization-from-scratch).  
My HOA was called Kendall Square, so created `Kendall-Square-VA`
6.  [Added people into the organization](https://help.github.com/en/github/setting-up-and-managing-organizations-and-teams/managing-access-to-your-organizations-repositories), 
I added the key HOA members.
7. Created a new repository called `<myorganization>.github.io`, owned by this organization.  In my 
case, this is `Kendall-Square-VA.github.io`.  If you don't know how to 
do this, here's a lot of instructions on 
[how to administer GitHub](https://help.github.com/en/github/administering-a-repository).  It's pretty 
straightforward though.  You can likely figure that out with the UI.  I'd suggest adding a README file though, so 
there's at least one file to clone (it's just easier - otherwise look up how to merge histories in git).
8. By default, in an organization, the repositories have "private" permissions.  However, I wanted this site to be 
hosted for free, so I adjust the permissions in the settings tab of the repository to "public".  If not,
I would have to pay for GitHub enterprise (though that negates the price benefit).
9. Clone the new repository and .

    `git clone <my-url>`

10. Next, I created a Jekyll site

```bash
git clone git@github.com:Kendall-Square-VA/Kendall-Square-VA.github.io.git
jekyll new my-awesome-site
cd jekyll new my-awesome-site
```

11. I installed Jekyll Import.

    `gem install jekyll-import`
      
12. Imported our posts from Wordpress.  
```bash
    ruby -r rubygems -e 'require "jekyll-import";
        JekyllImport::Importers::WordPress.run({
          "dbname"         => "dbname",
          "user"           => "myuser",
          "password"       => "password",
          "host"           => "http://www.kendallsquarefairfax.com",
          "port"           => "3306",
          "socket"         => "",
          "table_prefix"   => "wp_",
          "site_prefix"    => "",
          "clean_entities" => true,
          "comments"       => false,
          "categories"     => true,
          "tags"           => true,
          "more_excerpt"   => false,
          "more_anchor"    => false,
          "extension"      => "html",
          "status"         => ["publish"]
        })'
```

13. Cleanup... This took a while and was tedious.  This command created a number of files.  Not all of them were 
needed.  There were a bunch of posts that I didn't need or were blank.  All pages got placed into their own 
directory as "index.html" with no formatting.  I basically too "contact-us/index.html" and converted it to 
"contact-us.html" to reduce the number of files.  Not necessary, but made it cleaner.  I also went through and cleaned
up the metadata from the posts.  I didn't need nor want that much metadata.  So I removed exposed email addresses
and things like that.  Only kept it if I wanted it to be in the post.
14. Downloaded our homepage from https://kendallsquarefairfax.com/ and downloaded the html and css.  I then started 
carving out the pieces I cared about.
* I extracted the reusable components, such as the menu (as 
[menu.html](https://github.com/Kendall-Square-VA/Kendall-Square-VA.github.io/blob/master/_includes/menu.html)) 
and the footer (as [footer.html](https://github.com/Kendall-Square-VA/Kendall-Square-VA.github.io/blob/master/_includes/footer.html)), 
and put them into the `_includes` directory. These can be used later in the different templates 
[like this](https://jekyllrb.com/docs/includes/).
* Carved out the bones of the HTML so that it made a decent wrapper, putting the content section in the middle, 
and the includes where I wanted the content injected.  Saved this to an html file in the `_layouts`
directory as [default.html](https://github.com/Kendall-Square-VA/Kendall-Square-VA.github.io/blob/master/_layouts/default.html).
* Created some Extensions from `default.html`, such as 
[post.html](https://github.com/Kendall-Square-VA/Kendall-Square-VA.github.io/blob/master/_layouts/post.html) 
and [page.html](https://github.com/Kendall-Square-VA/Kendall-Square-VA.github.io/blob/master/_layouts/page.html)
* Logged into the WordPress and download all of the media files to `/static/img` directory.
* I set the Apex Domain, by removing [the current Apex domains](https://www.godaddy.com/help/manage-dns-zone-files-680)
* Added the [Githib Apex domains](https://help.github.com/en/github/working-with-github-pages/managing-a-custom-domain-for-your-github-pages-site)
* Voila!  I got a working site!

# Adding Social Media
One of the things that I really don't want to do is have to think about publishing to multiple platforms.  So I
made sure I was [included the appropriate headers](https://wiseodd.github.io/techblog/2016/08/15/jekyll-fb-share/) 
in my templates so that it looked good on social media and then used 
[IFTTT to post for me](https://ictsolved.github.io/auto-post-articles-from-jekyll-blog-to-social-sites/)

