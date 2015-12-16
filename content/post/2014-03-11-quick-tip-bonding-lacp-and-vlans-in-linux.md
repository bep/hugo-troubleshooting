---
title: "Quick Tip: Bonding, LACP, and VLANs in Linux"
date: 2014-03-11
author: "ben"
summary: ""
topics:  
  - Linux
  - Networking
  - Quick Tips
tags: [networking,linux,lacp,vlans,cisco]
projects: []
certifications: []
guides: []
sponsors: []
draft: false
comments: true
---
I have been doing a lot of tinkering with linux based storage (more to come on that!) over the past few weeks and I had to hunt and peck around the internet to find all of the information on using bonding/lacp and vlans in linux so I want to bring it all to one place.  All of these configuration files are from Ubnutu but the format should be similar in other distros.  All of the switch configurations were on a Cisco 2960 running IOS 12.2-lanbase which is a fairly old and basic switch.
<!--more-->
## Linux Setup

There are two modules to install for this setup, bonding and 8021q.  As follows:

{{< code lang="console" highlight="" title="Linux Setup" >}}
#install packages
# NOTE: ensure ifenslave 2.6 is what gets installed, required for VLANs
root@filer:~# apt-get install -y ifenslave vlan

#load modules manually to be sure
root@filer:~# modprobe 8021q
root@filer:~# modprobe bonding

#add to modules for reboots
root@filer:~# echo 'bonding' >> /etc/modules
root@filer:~# echo '8021q' >> /etc/modules
{{< /code >}}

## Basic Bonding using LACP

### Linux

This is the linux side of this link, the important part here is the bond-mode needs to be set to 802.3ad or mode 4.

{{< code lang="bash" highlight="" title="Eth Config" >}}
#slave interfaces
auto eth4
iface eth4 inet manual
bond-master bond0

auto eth5
iface eth5 inet manual
bond-master bond0

#bond interface
auto bond0
iface bond0 inet static
        address 192.168.1.10
        netmask 255.255.255.0
        #there are several modes, this is also known as mode 4
        bond-mode 802.3ad
        bond-miimon 100
        bond-slaves eth4 eth5
{{< /code >}}

### Cisco 2960

This is the configuration of the two switch ports and the port channel on the Cisco switch.  The important part here is using ‘active’ mode on the channel group.

{{< code lang="cisco" highlight="" title="Port Channels" >}}
!vlan 10 is my storage VLAN
interface Port-channel1
 switchport access vlan 10
end

interface GigabitEthernet0/43
 switchport access vlan 10
 channel-group 1 mode active
end

interface GigabitEthernet0/44
 switchport access vlan 10
 channel-group 1 mode active
end
{{< /code >}}

## Bonding with VLAN Trunking

Most people need to use both VLANs and 802.3ad trunking in the real world, especially for storage, as it turns out that is pretty easy.  In this example I only have one VLAN but the setup can be repeated for each additional VLAN.  Also on the “base” interface I don’t have any configuration, this is where the “native” IP configuration would go.

**Note:** This configuration can also be applied to a non-bonded interface.

### Linux

This is the linux side of this link, the important part here is the bond-mode needs to be set to 802.3ad or mode 4.

{{< code lang="bash" highlight="" title="Eth Config" >}}
#slave interfaces
auto eth4
iface eth4 inet manual
bond-master bond0

auto eth5
iface eth5 inet manual
bond-master bond0

#bond interface
auto bond0
iface bond0 inet static
        #native vlan, need ip to configure
        address 1.1.1.1
        netmask 255.255.255.0
        bond-mode 802.3ad
        bond-miimon 100
        bond-slaves eth4 eth5

auto vlan10
iface vlan10 inet static
        address 192.168.1.10
        netmask 255.255.255.0
        broadcast 192.168.1.255
        vlan-raw-device bond0
{{< /code >}}

### Cisco 2960

This is also similar to the other configuration, the ‘switchport trunk allowed’ section is optional, I wanted to prune the VLANs for this link.

{{< code lang="cisco" highlight="" title="Port Channels" >}}
!vlan 10 is my storage VLAN
interface Port-channel1
 switchport trunk allowed vlan 10
 switchport mode trunk
end

interface GigabitEthernet0/43
 switchport trunk allowed vlan 10
 switchport mode trunk
 channel-group 1 mode active
end

interface GigabitEthernet0/44
  switchport trunk allowed vlan 10
  switchport mode trunk
 channel-group 1 mode active
end
{{< /code >}}

This is a pretty simple setup, post a comment with suggestions or requests for more information and I will keep this post up to date.

## References

- [UbuntuBonding](https://help.ubuntu.com/community/UbuntuBonding)
- [Cisco LACP Reference](http://www.cisco.com/c/en/us/td/docs/ios/12_2sb/feature/guide/gigeth.html)
- [Ubuntu VLAN Wiki](https://wiki.ubuntu.com/vlan)
- [Ubuntu VLAN Interfaces manpage](http://manpages.ubuntu.com/manpages/hardy/man5/vlan-interfaces.5.html)
