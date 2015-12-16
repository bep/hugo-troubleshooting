---
title: "How To: ThinApp Firefox 29 and Plugins for vCloud Director 5.1.x"
date: "2014-08-04"
author: "ben"
summary: ""
topics:
  - Articles
  - Tutorials
  - vCloud
tags: [vcloud,vmware,thinapp,unsupported]
projects: []
certifications: []
guides:
  - vCloud
draft: false
comments: true
aliases:
  - 2014/08/how-to-thinapp-firefox-29-and-plugins-for-vcloud-director-5-1-x/
---

In response to [this article](http://www.beyondvm.com/2014/06/alert-firefox-30-is-not-a-supported-browser-for-vcloud-5-1-x/) about Firefox 30 and vCloud 5.1.x and [this article](http://www.beyondvm.com/2014/01/alert-java-jre-7u51-breaks-vcloud-uploads/) about Java updates breaking **everything** I decided to throw together a quick How-to on using ThinApp to create a sandboxed version of Firefox and Java that solves both of these problems pretty well.

This ThinApp setup includes a legacy version of Java (7u25) which is super old but it should help with accessing the following (not exhaustive list, just things I have run into, please help expand list):

* UCS Manager 2.1.x
* vCloud Director 5.1.x Uploads
* HP iLO 2.x
* Legacy DRAC
* vCloud VPN
* EMC Unisphere

<!--more-->

Onward, but first an important caveat:

{{< alert "danger" >}}
<h4>This process creates an insecure browser installation, DO NOT browse the internet with this configuration…ever.</h4>
<h4>You have been warned.</h4>
{{< /alert >}}

**Note**: I am not a ThinApp expert (and I usually avoid windows, hah!) so there may be a more elegant way to do this, if anyone has tips let me know!

First, collect the correct tools, I attached the versions that I used at the end of the post:

1. Firefox 29.0.1 [Link](https://ftp.mozilla.org/pub/mozilla.org/firefox/releases/29.0.1/win32/en-US/)
2. Java 7u25 (32 bit) [Link](http://www.oracle.com/technetwork/java/javase/downloads/java-archive-downloads-javase7-521261.html#jre-7u25-oth-JPR)
3. Flash Installer (for correct OS, I used Win8.1) [Link](http://get.adobe.com/flashplayer/otherversions/)
4. VMRC Installer for 5.1.x from your instance (or mine from 5.1.x below)
5. VMware ThinApp 5.x [Trial](http://www.vmware.com/go/trythinapp)
6. **Clean** Windows 7 or 8 Capture VM (Base install without security software is best)

After Windows is installed, the following are steps to take to create the package:

1. **Take snapshot** of base VM
2. **Install** ThinApp 5.x
3. **Take snapshot** (this is a theme, I have found a successful ThinApp capture is snapshot heavy)
4. **Start** “ThinApp Setup Capture” utility, Click Next

{{< lightbox title="Setup Capture" src="/img/posts/2014-08-how-to-thinapp-firefox-29-and-plugins-for-vcloud-director-5-dot-1-x/ff_thin_01.png" >}}

5. **Click** Prescan
6. **Install** Firefox
	1. **Choose** Custom
	2. **De-select** “Maintenance Service”
7. **Install** Flash (Latest version is fine)
8. **Install** Java
	1. **Choose** “Change Destination Location”
	2. Install to “c:\java”
9. **Install** VMRC Plugin
10. **Launch Firefox**, perform the following tasks
	1. **Navigate** to about:config in Firefox, Click “I’ll be careful, I promise!”
	2. **Change** the following settings
		1. app.update.auto – false
		2. app.update.enabled – false
		3. app.update.silent – false
		4. app.update.mode – 2
		5. extensions.update.autoUpdateDefault – false
		6. extensions.update.enabled – false
		7. (optional, disables login remembering) signon.rememberSignons – false
		8. (optional, enables pop-ups since vCD uses these) dom.disable_open_during_load – false
	3. **Verify** plugin updating is disabled:
		1. **Navigate** to Menu -> Addons
		2. **Click** Plugins
		3. **Click** the gear icon and make sure this option is not selected

    {{< lightbox title="Plugins" src="/img/posts/2014-08-how-to-thinapp-firefox-29-and-plugins-for-vcloud-director-5-dot-1-x/ff_thin_02.png" >}}

	4. Perform the following tasks to verify that Java is installed
		1. **Navigate** to this [Link](https://www.java.com/en/download/installed.jsp)
		2. **Click** “Activate”

    {{< lightbox title="Activate" src="/img/posts/2014-08-how-to-thinapp-firefox-29-and-plugins-for-vcloud-director-5-dot-1-x/ff_thin_03.png" >}}

		3. **Click** to “Allow and Remember”

		{{< lightbox title="Remember" src="/img/posts/2014-08-how-to-thinapp-firefox-29-and-plugins-for-vcloud-director-5-dot-1-x/ff_thin_04.png" >}}

		4. **Check** the “Don’t Ask Again…” Checkbox and **Click** Later

		{{< lightbox title="Don't Ask" src="/img/posts/2014-08-how-to-thinapp-firefox-29-and-plugins-for-vcloud-director-5-dot-1-x/ff_thin_05.png" >}}

		5. **Click** the Run button at the prompt to verify the Java applet loads
11. **Take Snapshot** (just in case)
12. Back to the ThinApp Capture Utility, **click** Postscan

{{< lightbox title="Postscan" src="/img/posts/2014-08-how-to-thinapp-firefox-29-and-plugins-for-vcloud-director-5-dot-1-x/ff_thin_06.png" >}}

13. Click OK

{{< lightbox title="Postscan" src="/img/posts/2014-08-how-to-thinapp-firefox-29-and-plugins-for-vcloud-director-5-dot-1-x/ff_thin_07.png" >}}

14. This will take some time, so grab some coffee.

15. **De-select** all entry points other than Firefox, **click** Next

{{< lightbox title="Entry Points" src="/img/posts/2014-08-how-to-thinapp-firefox-29-and-plugins-for-vcloud-director-5-dot-1-x/ff_thin_08.png" >}}

16. **Click** Next

{{< lightbox title="Next" src="/img/posts/2014-08-how-to-thinapp-firefox-29-and-plugins-for-vcloud-director-5-dot-1-x/ff_thin_09.png" >}}

17. **Click** Next

{{< lightbox title="Next" src="/img/posts/2014-08-how-to-thinapp-firefox-29-and-plugins-for-vcloud-director-5-dot-1-x/ff_thin_10.png" >}}

18. **Select** “Restricted write access”, **click** Next.

{{< lightbox title="Restricted Write" src="/img/posts/2014-08-how-to-thinapp-firefox-29-and-plugins-for-vcloud-director-5-dot-1-x/ff_thin_11.png" >}}

19. **Select** “Same Directory…”, **click** Next.

{{< lightbox title="Directory" src="/img/posts/2014-08-how-to-thinapp-firefox-29-and-plugins-for-vcloud-director-5-dot-1-x/ff_thin_12.png" >}}

20. **Select** No (unless you want to share), **click** next

{{< lightbox title="Share Information" src="/img/posts/2014-08-how-to-thinapp-firefox-29-and-plugins-for-vcloud-director-5-dot-1-x/ff_thin_13.png" >}}

21. **Click** next (I don’t use the ThinDirect feature because it only works with IE)

{{< lightbox title="Redirection" src="/img/posts/2014-08-how-to-thinapp-firefox-29-and-plugins-for-vcloud-director-5-dot-1-x/ff_thin_14.png" >}}

22. **Update** inventory name to “Firefox 29.0.1″ to differentiate it.

{{< lightbox title="Inventory Name" src="/img/posts/2014-08-how-to-thinapp-firefox-29-and-plugins-for-vcloud-director-5-dot-1-x/ff_thin_15.png" >}}

23. **Select** “Use one of the entry points” then pick “Mozilla Firefox.exe”, **Check** “Compress virtual package”, **Click:**

{{< lightbox title="Package Settings" src="/img/posts/2014-08-how-to-thinapp-firefox-29-and-plugins-for-vcloud-director-5-dot-1-x/ff_thin_16.png" >}}

24. **Click** OK

{{< lightbox title="Capture" src="/img/posts/2014-08-how-to-thinapp-firefox-29-and-plugins-for-vcloud-director-5-dot-1-x/ff_thin_17.png" >}}

25. **Ignore** warnings (like a boss) and **click** Next

{{< lightbox title="Warnings" src="/img/posts/2014-08-how-to-thinapp-firefox-29-and-plugins-for-vcloud-director-5-dot-1-x/ff_thin_18.png" >}}

26. **Click** “Edit Package.ini”

{{< lightbox title="Edit Package" src="/img/posts/2014-08-how-to-thinapp-firefox-29-and-plugins-for-vcloud-director-5-dot-1-x/ff_thin_19.png" >}}

27. In Package.ini, **Locate** the block “[Mozilla Firefox.exe]” and perform the following changes to the block
    1. Add “StatusbarDisplayName=BeyondVM Firefox 29.0.1 Build “
    2. Add  “CommandLine=%ProgramFilesDir%\Mozilla Firefox\firefox.exe -no-remote”
    3. Rename block from [Mozilla Firefox.exe] to [Mozilla Firefox 29.0.1.exe]
28. **Save** Package.ini
29. **Click** Build

> Wait, this will also take some time, more coffee!

30. Click Finish

{{< lightbox title="Finish!" src="/img/posts/2014-08-how-to-thinapp-firefox-29-and-plugins-for-vcloud-director-5-dot-1-x/ff_thin_21.png" >}}

At this point you will have a functioning ThinApp package file all bundled up in the single exe file in the bin directory.  You might notice that this package is quite large, I performed the following additional steps to my package to get it down to about 350MB from over 800.

1. **Edit** Package.ini and perform the following modifications
    1. **Add** the following section below the compression type
        <pre>
        [FileList]
        ExcludePattern=*.bak,*.msi,*.mst,*.cab,*.msp
        </pre>
    2. **Delete** all entry points other than [Mozilla Firefox 29.0.1.exe]
    3. **Delete** the following directories from the package (note: I have not exhaustively tested this, some of these may be required but it worked for me)
        - %drive_C%\Users\All Users\Microsoft\Windows Defender
        - %ProgramFilesDir(x64)%
        - %SystemRoot%\WinSxS
        - %SystemRoot%\assembly
        - %SystemRoot%\Installer
        - %SystemRoot%\Logs
    4. **Run** build.bat as **an Administrator**

After that the package is pretty snappy and should be good to go.  It will create a profile directory next to the EXE to save settings in, this will include popup allowing and certificate exceptions.  The first time I logged into my vCloud instance I had to tell it to run the JRE again, I was unable to figure out how to get it to never ask during the build process but it wasn’t that bad to just do it the first time.

These are all of the files required to do this as well as the package I created following these directions. My pre-built package will expire in about 60d unless I can get VMware to give me a community license (hint hint).

- {{< download title="BeyondVM Firefox 29 Bundle" path="http://downloads.beyondvm.com/2014-08-how-to-thinapp-firefox-29-and-plugins-for-vcloud-director-5-dot-1-x/BeyondVM Firefox 29.0.1.zip" icon="fa-file-archive-o" >}}
- {{< download title="Firefox Setup 29.0" path="http://downloads.beyondvm.com/2014-08-how-to-thinapp-firefox-29-and-plugins-for-vcloud-director-5-dot-1-x/Firefox Setup 29.0.exe" icon="fa-file-o" >}}
- {{< download title="FirefoxPortableESR 24.7.0 English Paf" path="http://downloads.beyondvm.com/2014-08-how-to-thinapp-firefox-29-and-plugins-for-vcloud-director-5-dot-1-x/FirefoxPortableESR_24.7.0_English.paf.exe" icon="fa-file-o" >}}
- {{< download title="VMware VMRC Plugin" path="http://downloads.beyondvm.com/2014-08-how-to-thinapp-firefox-29-and-plugins-for-vcloud-director-5-dot-1-x/vmware-vmrc-win32-x86.exe" icon="fa-file-o" >}}

Please leave a comment if there is anything I can improve!

Lastly, the caveat we started with:

{{< alert "danger" >}}
<h4>This process creates an insecure browser installation, DO NOT browse the internet with this configuration…ever.</h4>
<h4>You have been warned.</h4>
{{< /alert >}}

Goodnight and Good Luck.
