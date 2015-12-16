---
title: "Alert: Firefox 30 is not a supported browser for vCloud 5.1.x"
date: 2014-06-19
author: "ben"
summary: ""
topics:
  - Announcements
  - vCloud
tags: [vcloud,vmware,firefox,issue,bug,workaround]
projects: []
certifications: []
guides: []
sponsors: []
draft: false
comments: true
---
**Update (8/4/2014):** I have [created a tutorial](http://www.beyondvm.com/2014/08/how-to-thinapp-firefox-29-and-plugins-for-vcloud-director-5-1-x/) on how to create a ThinApp package to help get around this, check it out!

****

If you suddenly start seeing something the following error in vCloud Director 5.1.x:

![Error](/img/posts/2014-06-alert-firefox-30-is-not-a-supported-browser-for-vcloud-5-dot-1-x/vcloud_ff_error.png)

This is because your Firefox upgraded to Firefox 30 automatically, as it does.  This error seems to be due to some sort of change that Mozilla added into Firefox 30, I haven’t tracked it down yet (if anyone has let me know!).  Even force enabling the plugin won’t help, Firefox 30 looks to have gone to an whitelist only model, doing so will make this error go away but the console sessions never connect.
<!--more-->
That being said, VMware has [stated](http://kb.vmware.com/kb/2034554) that Firefox 30 will not be a supported browser for vCloud 5.1.x (the VMRC plugin doesn’t actually function so it is not a question of only supportability).  Unfortunately it is also not supported in IE 10, 11 or Chrome 35 so the only option is really Firefox 29 (or Firefox 3.6). The only solution is to upgrade to vCloud 5.5.x, which while true isn’t really a solution.

As a note, I have had success using ThinApp to isolate a Firefox 29.0.1 with the VMRC plugin, Flash and Java and Portable Firefox may be an option too. Either way, be sure to disable auto-update (Firefox Options -> Advanced -> Update) if you downgrade to Firefox 29.0.1.  There are some [tips here](http://blogs.vmware.com/thinapp/2009/12/multiple-instances-of-an-application.html#more-1268) on how to do that, the big one being the ‘-no-remote’ option to allow the ThinApp Firefox to launch its own process.

**Update:** It seems that installing the Firebug plugin and enabling that will allow the console to connect in Firefox 30 after forcing the plugins to activate.  While cumbersome, this is another workaround.

**Update 2:** (7/29/14): I have found another solution!  It is possible to use the [Portable Firefox ESR Version](http://portableapps.com/apps/internet/firefox-portable-esr) (Extended Support Release), this is a Firefox 24 package that will run  in a sandbox.  It will use the installed plugins on your system so if your Java version is [also incompatible](http://www.beyondvm.com/2014/01/alert-java-jre-7u51-breaks-vcloud-uploads/) that won’t work.  One thing to change, perform the following:

1. Locate FirefoxPortable.ini in your extracted ESR download (might be in Other/Source directory).
2. Copy to the root of Portable Firefox ESR install directory
3. Edit file and change the “AllowMultipleInstances” variable to true.
4. Save

This will allow the Portable Firefox and Installed Firefox to run at the same time.
