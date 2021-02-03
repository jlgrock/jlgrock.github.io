---
layout: post
title: Setting up Podman 2.x for MacOS
date: 2021-01-25 17:42:00 -0500
description: Creating a VM for use with Podman and setting up Podman to connect to it
img: 2021/podman.png
tags: [containers]
---

# Setting Up Podman 2.x on MacOS

Being that this is an very quickly changing software, please take these comments at this point as just that - the state of 
what it is today (January 2021).  This is a handy little guide for getting podman installed on MacOS (probably works pretty similarly
on Windows as well).

## What is Podman?
  [Podman](https://developers.redhat.com/blog/2018/08/29/intro-to-podman/) is a container 
manager that matches the majority of the Docker API.  Unlike [Docker](https://docs.docker.com/get-started/overview/), 
it doesn't run a daemon, so [using podman](https://podman.io/) as a compilation tool (in theory) will have less security 
problems since it doesn't require a daemon running with root.  In my opinion, people are also pushing back on Docker 
because it's [not totally open source](https://robrich.org/archive/2019/08/17/its-ok-docker-isnt-completely-open-source.aspx), 
as they are trying very hard to monetize a product, and the likes of Red Hat, Pivotal, and Google are destroying their efforts
by adopting [Kubernetes](https://kubernetes.io/) instead of [Docker Swarm](https://thenewstack.io/kubernetes-vs-docker-swarm-whats-the-difference/).  
Such is the way.

So, ideally, you can install podman on your machine and if you know Docker, you know how to use it immediately as the 
commands are analagous.  You can, apparently, even alias podman in your bash shell to docker and it will work (mostly) the same
from a user perspective.

## Why is this complicated then?

Well, it turns out that you can't run podman engine on anything but Linux.  A long time ago, you had to be very specific 
what type of virtualization you were capatilizing on.  Docker created [Docker Machine](https://github.com/docker/machine)
which could control local and remote machines.  Note that this tool is still used for remote machines with Swarm.  Then
Docker did some wonderous things to figure out how to make a Linux machine run in-memory as part of your Docker installation.  This
would run on the native container runner in each environment, (mostly) transparent to the user.  This is what Docker runs on...


| OS      | Virtualization Hypervisor           |
|---------|-------------------------------------|
| Linux   | [LXC](https://linuxcontainers.org/) |
| BSD     | [bhyve](https://bhyve.org/)         |
| Windows | [Lightweight Hyper-v](https://docs.microsoft.com/en-us/virtualization/windowscontainers/about/) |
| MacOS   | [xhyve](https://github.com/machyve/xhyve) |


Podman tried to copy this, with boot2podman, but at this point they have said that this is deprecated and that you should use Linux with Vagrant instead.
Which is why I'm writing this article.  Because how to set that up was **not** clear.

## Homebrew

At this point, you should be using a package manager, as it's nuts to be figuring out install packages for everything yourself.  Just too much software.  On Fedora/RHEL, this is `dnf`, but we're on MacOS, and the package manager of choice in this article, is **Homebrew**.  Go to the [homepage](https://brew.sh/) and install it, if you haven't already.  If you have, I suggest doing a `brew update` just to make sure you have updated your sources.

## Install Virtual Machine software

Install [Oracle VirtualBox](https://www.virtualbox.org/wiki/Downloads) if you don't currently have anything.  It's free and works well enough.  If you have a license, you can also use [Parallels Business Edition](https://www.parallels.com/) or [VMWare Desktop Pro](https://www.vmware.com/products/workstation-pro.html), but it has to be those versions or higher as it does require some access to port forwarding.


## Creating a Vagrant Image

Since this application can only be run in Linux (and really has been mostly tested in Fedora and Red Hat Enterprise Linux), we have to have one of those images 
on-hand to make this work.  You don't have to do this - you could download the VM image directly to your 

So first thing, if you don't have vagrant, install it with 

```bash
brew install vagrant
```

If you want vagrant to work with your Parallels installation, you also need to install the vagrant plugin with

```bash
vagrant plugin install vagrant-parallels
```

Similarly, if you want this to work for VMWare, install the VMWare plugin with 

```bash
vagrant plugin install vagrant-vmware-desktop
```

Now, create a directory somewhere.  I'm going to use `~/workspace` as my directory for this example.  In that directory, we're going to make a directory called "fedora-box" (feel free to call it "podman-box" or whatever), then change directories into it

```mkdir 
mkdir ~/workspace ~/workspace/fedora-box && cd ~/workspace/fedora-box
```

Now, create a vagrant file to define your virtual machine in this directory with the following command.  This will create a Fedora 33 image, set the appropriate provider, forward the port 2222 to port 22, and install and enable the appropriate podman software

```bash
echo "Vagrant.configure("2") do |config|
  config.vm.box = "generic/fedora33"
  config.vm.hostname = "fedora33"
  config.vm.provider "virtualbox" do |v|
    v.memory = 1024
    v.cpus = 1
  end
  config.vm.network "forwarded_port", guest: 22, host: 2222
  
  config.vm.provision "shell",
    inline: "sudo dnf install --refresh --enablerepo=updates-testing podman libvarlink-util libvarlink ntp"
    inline: "sudo systemctl enable io.podman.socket"
    inline: "sudo systemctl start systemd-timesyncd.service"
    inline: "sudo loginctl enable-linger $USER"
end" >> Vagrantfile
```

Occassionally, you may have issues with connecting to the vm box repository for vagrant and you'll have to download it with the insecure flag.  I had to do this, as my company does a man-in-the-middle attach on all of their employees certificates (don't get me started on how much I hate that...).  To get around this, download with the
following command.

```bash
vagrant box add generic/fedora33 --insecure
```

OK, no you just need to start the Vagrant box, which is as easy as running the following command

```bash
vagrant up
```

Though not necessary for this tutorial, if at a later point, you want to get into that virtual machine, you can ssh to it with the command, which will reference the generated ssh cert and log you in pretty easily.
```bash
vagrant ssh
```

## Install Podman and connect it to your virtual machine
At this point, podman is running on your linux machine, but it isn't running on your MacOS machine.  Let's get that fixed.

First, install podman on MacOS

```bash
brew install podman
```

Cool, now it should be up and running.  verify this with the following command.  It returns `podman version 2.2.1` for me.

```bash
podman --version
```

Now, we just need to tie it you your virtual machine.  The easiest way to do this is to tie your default podman connection (because you can have many, I want to 
call this out) to the vagrant box.  This can be easily done with the command.

```bash
podman --remote system connection default vagrant
```

OK, let's test it out... and remember, this works exactly like docker.  So, I'm jumping over to Docker hub and grabbing the 
[Hello World Image](https://hub.docker.com/_/hello-world).  The instructions say to execute `docker run hello-world`, so I'm swapping `docker` out for
`podman`

```bash
podman run hello-world
```

And voila!  You should get some generated output saying "Welcome to Docker!"


## Thats All!

OK, it could have been easier.  Thus why Docker is still winning the hearts and minds of many developers.  Just not necessarily organizations.
But, with these instuctions, it's definitely not terribly complicated and gets you working with podman pretty quickly.

