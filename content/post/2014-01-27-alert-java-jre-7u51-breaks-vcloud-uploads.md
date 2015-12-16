---
title: "Alert: Java JRE 7u51 breaks Everything"
date: 2014-01-27
author: "ben"
summary: ""
topics:
  - Announcements
  - vCloud
tags: [vmware,java,bugs,error,fix,workaround]
projects: []
certifications: []
guides: []
sponsors: []
draft: false
comments: true
---
**Update (8/4/2014):** I have created a tutorial on how to create a ThinApp package to help get around this, check it out!

***

This morning it came to my attention that my customers were no longer able to upload any media (OVFs or ISOs) to their vCloud catalogs. This seems to be due to the most recent Java JRE version released by Oracle.  The behavior I experienced was that the applet would appear to load but when I would click on the browse button nothing would happen.  This happens across all different browsers and browser versions.  The reason for this seems to be a change in the requirements for certificates and applet signing in JRE 7uU51.
<!--more-->
Luckily, there is a quick workaround for this:

1. Open **Configure Java** control widget, navigate to **Security** then **Edit Site List**.

![](/img/posts/2014-01-alert-java-jre-7u51-breaks-vcloud-uploads/vcloud_uploads_java_a.png)

2. Type the URL for your vCloud instance in the blank and Click **Add** to add (repeat for multiple URLs), click **OK**

![](/img/posts/2014-01-alert-java-jre-7u51-breaks-vcloud-uploads/vcloud_uploads_java_a.png)

Thats it!  This really is a workaround, I am not sure what the final solution will be but this got my customers and I back into business for now.  If anyone has more information, let me know!

**Update:** It seems that this update actually breaks everything from HP iLO to vCenter Orchestrator, I am still searching for a better workaround if anyone knows of one.

**Update 2:** There are reports of this breaking Cisco UCS, Dell iDRAC, vCloud VPN and EMC Unisphere as well.  It might be safe to say that most Java based management tools are going to be effected.  VMware has released a KB article about their parts of it, check it out here.  One interesting thing in the KB is that the upload portion of this issue does not effect vCloud 5.5 as this uses the Client Integration Plugin.

**Update 3:** Setting the security level to “Medium” also seems to work for most things.

![](/img/posts/2014-01-alert-java-jre-7u51-breaks-vcloud-uploads/vcloud_uploads_java_a.png)
