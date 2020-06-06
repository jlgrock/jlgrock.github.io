---
layout: post
title: Microsoft Active Directory and Cached Credentials
date: 2015-06-10 12:00:00 -0500
description: Microsoft Active Directory and Cached Credentials
tags: [technology]
---

Microsoft has a feature that allows you to log into your computer using the Active Directory domain password.  That's
great, until you need to log in on an airplane, where you may not have internet connection back to your office.  So,
Microsoft manages the cacheing of credentials.  The downside to this is if you log in from multiple computers and one
day decide to change your password.  You'll get a nice error like "The user or password is not correct."  The problem
is that there is a local user, which is cached to help you log into a disconnected environment, and the domain user,
which is the global user for your company.  And if you are out of the office, you can't communicate with Active
Directory without connecting via the VPN.  So, to correct this, you do the following:

1. Log onto the system with the local/old credentials
2. Connect through VPN and verify that you have connection to the domain using your new domain password
3. Lock your system (this will force the system to reset your cache using the domain password)
4. Unlock your system, prompting you for credentials, and use your domain password to log in now

There you have it. Your login credentials are now effectively synchronized with Active Directory. 
(Verified with Windows XP SP3 and Windows 7).