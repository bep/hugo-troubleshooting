---
title: "Tutorial: 802.3ad Port Configuration with ESX"
date: 2009-08-05
author: "ben"
summary: ""
topics:
  - Tutorials
  - ESXi
  - Networking
tags: [vmware,networking,lacp,cisco,esx]
projects: []
certifications: []
guides: []
sponsors: []
draft: false
comments: true
---

Just wanted to post a quick post about how to configure 802.3ad port consolidation with a Cisco switch and VMware ESX (vSphere was used for this example).  I was using an HP DL380 with 2 onboard NIC and 2 24 port Cisco 3750G connected with stackwise cables.

Switch Configuration:

{{< code lang="cisco" highlight="" title="" >}}
…
interface GigabitEthernet1/0/1
description ESX NIC 2
switchport trunk encapsulation dot1q
switchport mode trunk channel-group 1 mode on
end
…
interface GigabitEthernet2/0/14
description ESX NIC 2
switchport trunk encapsulation dot1q
switchport mode trunk channel-group 1 mode on
end
…
interface Port-channel1
description ESX PortChannel
switchport trunk encapsulation dot1q
switchport mode trunk
end
…
{{< /code >}}
<!--more-->
What I did was group two gigabit ports (1/0/14 and 2/0/14) into one port channel group (1).  Then I applied the trunk settings to the port channel instead of the individual ports.  As for the ESX side, I configured the virtual switch with more than one active adapter and set the “load balancing” to “Route based on IP hash.”

{{< lightbox title="" src="/images/posts/2009-08-05-tutorial-802-3ad-port-configuration-with-esx/iphash.jpg" >}}

If this set up would not have been using a trunk, the following configuration would have been used:

{{< code lang="cisco" highlight="" title="" >}}
…
interface Port-channel1
description ESX PortChannel
switchport mode access
switchport access vlan <vlan for port group>
end
…
{{< /code >}}
