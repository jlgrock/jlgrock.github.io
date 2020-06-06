---
layout: post
title: Configuring a Modern Java Development Environment in Windows with Windows Subsystem for Linux
date: 2017-12-08 12:00:00 -0500
description: Configuring a Modern Java Development Environment in Windows with Windows Subsystem for Linux (WSL)
img: 2017/100515-microsoft-linux-100619799-large.jpg
tags: [maven]
---

I am a Java developer, and the impedence mismatch between Linux and Windows is still there, but the Linux is actually 
useable as a shell in Windows now, thanks to the RedStone 2 Release of Windows (aka the Creators Update or 
[Version branch 1703](https://en.wikipedia.org/wiki/Windows_10_version_history)). Now I’m not saying this is perfect - 
not by any means. The filesystem abstraction means that this stuff is way slower than you will get when compared to a 
barebones Linux or OSX environment. But sometimes you don’t have a choice. And this should only get better over time - 
believe me.  My friends working at Microsoft are using Linux just as much as I am.  Below, I’m detailing how to get 
your Java environment set up to use in Windows 10 when targeting a Linux installation.

## Install Ubuntu in the Windows Subsystem for Linux
if you aren't using a POSIX environment, it is suggested that you either install Bash for Windows</a>, also known as the 
Ubuntu Subsystem using the Windows Subsystem for Linux (WSL). I make this distinction because, as of the latest 
release of Windows, they are starting to support multiple Linux distributions. Please note, some issues have been 
encountered when enabling Developer Mode, especially in locked down corporate environments - 
[please see this](https://www.kapilarya.com/developer-mode-package-failed-to-install-error-code-0x80004005-windows-10) 
and specifically choose the edit your registry option.

Although not required, I symlinked my Windows ssh directory so that I could use the same keys in both Linux and Windows 
with the following commands (assuming a clean install! Don’t blindly follow me and delete your keys!):
```
rm ~/.ssh/
ln -s /mnt/c//.ssh/ ~/.ssh/
```

## Install Perforce 4 (optional, but suggested)
We want a solid Diff/Merge Tool for Git. I usually use kdiff3 or Perforce. Since I am giving you the best of both 
worlds - the better free diff tool is actually on Windows.

[Go here](https://www.perforce.com/downloads/helix#product-10). Select "HELIX P4V: VISUAL CLIENT”, fill out some 
info, and install.

## Install Git
Git is a necessary tool at this point, if you are using Subversion, I suggest you use 
[git-svn](https://git-scm.com/docs/git-svn) commands to commit to subversion. The only real argument here should be 
that mercurial might be better. Other than that, no discussions.

Install with the following command:
```
sudo apt-get install git git-core
```

## Oh my ZSH (optional, but suggested)
I prefer to have my system match the Mac that I use personally. On my Mac, I use zsh, plus the zsh extensions that 
are readily updated for the world via a team over at Oh-My-Zsh. This is definitely a personal choice and not a 
necessary step. If you prefer to continue using Bash over Zsh, feel free to skip this step.

To add this to my shell environment this, I do the following:
```
sudo apt-get -y install zsh
wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh
```

Now ZSH is installed - unfortunately it won’t work unless you tell Bash to run zsh. Annoying, but easily fixable. 
I’ll do that in ConEmu though, as that is my Shell environment of choice. If you don’t want to use ConEmu, just grab 
the command out of that section and update your Windows shortcut for "Bash for Windows”.There’s a 
[couple of ways to do it](https://evdokimovm.github.io/windows/zsh/shell/syntax/highlighting/ohmyzsh/hyper/terminal/2017/02/24/how-to-install-zsh-and-oh-my-zsh-on-windows-10.html), 
but the best way that I’ve found is the following.

Open your ~/.bashrc and add the following code:
```bash
# Launch Zsh
if [ -t 1 ]; then
exec zsh
fi
```

## Configure Git
I’ve gleaned this gem from [this article](https://www.sep.com/sep-blog/2017/06/07/20170607wsl-git-and-beyond-compare/), but I’ve adjusted it for Perforce. Edit your `~/.bashrc` and `~/.zshrc` (if applicabl) to both have files adjusting your temporary directory, otherwise everything blows up when you try and do a mergetool or difftool command.
```bash
export TMPDIR='/mnt/c/Users//AppData/Local/Temp'
alias gdiff='git difftool -y --dir-diff --no-symlinks’
```

Change the directory that you want your temporary files stored to to point to the windows mount by running the following bash commands:
```bash
git config --global merge.tool p4merge
git config --global mergetool.p4merge.path /mnt/c/Program Files/Perforce/p4merge.exe’
git config --global mergetool.p4merge.cmd \"/mnt/c/Program Files/Perforce/p4merge.exe\" \"`echo $LOCAL | sed `s_/mnt/c_C:_’`\” \"`echo $REMOTE | sed `s_/mnt/c_C:_’`\" \"`echo $MERGED | sed `s_/mnt/c_C:_’`\" 
```

## ConEmu (also optional, but also suggested)
Since I like having a quake-style interface for my terminal environments, I installed ConEmu from 
[the following location](https://conemu.github.io/en/Downloads.html). It can run multiple types of shells (Command 
Terminal, Powershell, WSL Bash) and just create tabs for them. Plus, the fonts are WAY better in this terminal executor. 
Helps my productivity, but is definitely not a necessary step

Open the program and mess with the following settings:
* Change the font! - Seriously, the fonts that Microsoft allows for use are atrocious and do not support the full 
character set. I chose Consolas (not great, but better - at least it shows arrows and tilde), size 14, Unicode 
Ranges=Pseudographics: 2013-25C4
* Quake Style - I personally enjoy having a terminal drop down from above. I personally chose the Quake-style slide 
down, animation=300ms, Frame width=-1, appear delay:2000, disappear:2000

## Install Java in both Windows and Linux
You could try and use a single install - but don’t. They are different releases running different bytecode. WSL 
allows you to call out to Windows processes - and this is a Windows process, but if you are trying to develop for a 
Linux environment it makes more sense to just use the one with all it’s glory and bugs that you are targeting anyways.

# Install your IDE of choice
Pick one or all. I work mainly in Java EE, so this is influencing my suggestions. But this is totally preference. Take 
this all with a grain of salt. Try each of them (and more!), figure out what works best for you.  I have them all 
installed at all times.
* [IntelliJ Ultimate](https://www.jetbrains.com/idea/download/) - You could get the basic, but we said “Modern”, which 
means that that’s a bit more cutting edge. So this one is a bit more costly, but worth every penny IMHO.
* [Eclipse](https://www.eclipse.org/downloads/eclipse-packages/) - The industry standard. Just make sure to download 
the Java-EE version of the IDE if you are doing any real Java development.
* [NetBeans](https://netbeans.org/downloads/) - Choose the Java EE Version or All Version. I don’t do much C/C++ 
anymore, so it doesn’t apply to me. But as a I do some Groovy development, the ALL version is the only one I’d download.
* [Sublime Text 3](https://www.sublimetext.com/3) - Free to use, pay to remove the annoying popup. Not really an IDE, 
but I use it constantly. [Atom](https://atom.io/) is a competing product, if you’d rather. Make sure to install the 
[plugin manager](https://packagecontrol.io/installation) and install some of the fun plugins like Markdown and Docker 
support

## Install Maven in Windows
OK, I much prefer Gradle over Maven, but Maven runs the world - like 90% of projects are using it right now. It’s 
stable, and it even has 
[multi-language support now](https://dzone.com/articles/refer-to-a-connector-configuration-from-a-java-com). So we 
need this installed if we are going to ever use any projects other than our own.  Step-by-step Instructions are
[here](https://www.mkyong.com/maven/how-to-install-maven-in-windows/).

Once you have completed that - In your Ubuntu shell, delete your ~/.m2 directory If you have one. Symlink your 
`.m2` (including repo, user settings and .m2 security files) to be on the C drive with

```bash
ln -s ~/.m2 MAVEN_OPT/
```

Install Maven in ubuntu by running this:

```bash
sudo apt-get install maven
```

## Install Gradle
So IMHO, this is the build tool everyone should be using. The biggest reason - it supports aspect oriented injection 
of functionality. So, for example, if I need to make a minor change to a plugin that already exists, I don’t have to 
write a brand new maven plugin. Having a true inheritance model is pretty dope too. But I digress - installation of 
this is pretty easy. Just follow [these instructions](https://gradle.org/install/)

## Install Docker
Make sure that Hyper-V is enabled in your BIOS. If it is not, you may need to edit your BIOS or reach out to your IT 
department for them to edit your BIOS. Install [Docker for Windows](https://docs.docker.com/docker-for-windows/install/).

## Configure Docker
OK, now there’s some wonkeyness to allow your different docker clients to use the same software. I create a quick set 
of instructions, but I got this from
 [here](https://nickjanetakis.com/blog/setting-up-docker-for-windows-and-wsl-to-work-flawlessly), so if you need to 
 read more about it and somethings not quite working, please refer to Nick’s post.

Due to a funny design decision with Docker for Windows, it converts paths to `/c/path` (for your C drive). Since WSL 
uses `/mnt/c`, we need to adjust the pathing so that Docker will point to the correct location. So, to do this, we just 
bind the drive to another location. ():

```bash
sudo mkdir /c
sudo mount --bind /mnt/c /c
```

Add the following to your ~.bashrc and/or .zshrc:

```bash
export DOCKER_HOST=tcp://0.0.0.0:2375
sudo mount --bind /mnt/c /c
```

now add the command sudo visudo and add the following line:

```bash
ALL=(root) NOPASSWD: /bin/mount
```

## Making your environment environment available in both locations (optional)
Being that I do most of my development in a directory in my home directory (they are my files after all and should be scoped accordingly), I symlink my directories so that they exist in both environments. For example, I work in a `~/workspace` directory, so I symlink with Windows using the following command:

```bash
ln -s /mnt/c/Users//workspace /home//workspace
```

## Amazon CLI (very optional)
Amazon updates their instructions pretty regularly, and there’s nothing crazy here, but I seem to use it regularly, on multiple projects, so it’s nice to have these links around:
[Installing the latest CLI](http://docs.aws.amazon.com/cli/latest/userguide/installing.html)
[Using Multiple CLI profiles](https://docs.aws.amazon.com/cli/latest/userguide/cli-multiple-profiles.html)

**And that’s it! Yes - I’m aware that you could install a bunch more tooling, but this seems to be my core Java tooling. Feel free to modify it and use it at will.**

