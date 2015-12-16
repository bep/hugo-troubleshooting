---
title: "Intel Avoton: The Perfect Home Lab Host?"
date: 2014-01-31
author: "ben"
summary: ""
topics:
  - Articles
  - Home Lab
  - Lab
  - Whitebox
tags: [lab,hardware,homelab]
projects: []
certifications: []
guides: []
sponsors: []
draft: false
comments: true
---
## Introduction

In the ever present search for the “ultimate home lab box,” I ran across a new contender, the new [Intel Avoton](http://ark.intel.com/products/77987/Intel-Atom-Processor-C2750-4M-Cache-2_40-GHz). This is a really interesting SoC (System on a Chip) that has some promise for home lab.  The Avoton C2000 series SoCs are based on the new 22nm manufacturing process that came with haswell which is a drastic improvement on the previous models.
<!--more-->
One of the most interesting things about it is that it now allows for out of order pipeline execution. This is one of the things that made previous Atom CPUs/SoCs so much slower.  Another thing that is really intriguing about it is that it now supports both VT and is a 64bit CPU, so it can run both 64 bit and 32 bit guests as well as having 8 cores (there is a 4 core model available as well).  Also, this architecture has a maximum memory of 64GB which puts it right in the sweet spot for home lab nodes, though it is more likely that these boards will see 32GB (4x8gb) until the price of 16GB dimms/sodimms comes down.  And, the best part is that this SoC has a TDP of 20w – crazy!

The first motherboard I found to really support this CPU was the [Asrock C2750D4I](http://www.asrock.com/server/overview.asp?Model=C2750D4I), I picked one up to do a little testing to see what it really could do.  Here is what the layout looks like, courtesy of the Asrock website:

![](/img/posts/2014-01-intel-avoton-the-perfect-home-lab-host/avoton_lab_C2750D4Im.jpg)

This motherboard is pretty slick! It has a dedicated IPMI port with a simple web interface as well as dual on board NICs and 4 full size DIMM slots.  This particular board also features 12 SATA (mix of 3gb and 6gb) ports which would also make this a great home NAS base.

Note: To get ESXi 5.5 running on this board you will have to manually add the Intel igb driver to your ISO. I used [esxi customizer](http://www.v-front.de/p/esxi-customizer.html) for this because I am a lazy admin, but you can also do it with image builder. The driver was present in 5.1, and I am not sure why VMware removed it from 5.5. The driver can be found here: [ESXi5X-INTEL-igb-4017](https://my.vmware.com/group/vmware/details?productId=268&downloadGroup=DT-ESXi5X-INTEL-igb-4017)

SuperMicro has also come out with a few boards but they were not widely available when I started testing.  The most interesting ones are [A1SAi-2750F](http://www.supermicro.com/products/motherboard/atom/x10/a1sai-2750f.cfm).  This board has a [Marvell Alaska 88E1543](http://www.marvell.com/transceivers/alaska-gbe/) transceiver on it that allows it to have 4x 1GBe NICs. I am not sure how that will play with ESX but I plan on ordering one to test! It also has an onboard USB header which is always handy. However, it does have fewer SATA ports, but that isn’t a huge deal for an ESXi node. SuperMicro has a few uATX boards with an extra PCIe slot on it that look pretty cool as well, but those are a little big for me.

Now, by far the coolest use of this SOC is the [HP Moonshot](http://www.hp.com/go/moonshot) blade system.  I mean, just look at this thing (image from hp.com):

![](/img/posts/2014-01-intel-avoton-the-perfect-home-lab-host/avoton_lab_moonshot.jpg)

This thing is nuts! As you can see in the picture there are 45 small blades mounted vertically in a 4.5U chassis. This also includes a switched backplane that they all connect to. The blade that uses the Avoton is the [m300](http://www8.hp.com/us/en/products/proliant-servers/product-detail.html?oid=6488204&effectivedate=2013-12-10#!tab=features) (image from hp.com):

![](/img/posts/2014-01-intel-avoton-the-perfect-home-lab-host/avoton_lab_moonshot_blade.jpg)

I would love to get one of these chassis to play around with. It would be perfect for a lab of servers or mass scale small nodes. I wonder what the cost per VM would look like when using these blades for a farm of small VMs like a VDI environment, where each VM has about 2-4GB of memory, which would get you about 15-25 VMs on each node.  Interestingly, these blades don’t seem to support 64GB of ram. I wonder if that is a misprint or if HP does not have 16GB SODIMM modules available.

## Testing

As a simple test of what kind of performance a CPU can give me, I like to set up two VMs and run a netperf test since this type of traffic involves mostly a CPU activity.  My test setup is pretty simple: I have two Ubuntu VMs, each with 2x vCPU and 4gb memory and a single VMXNET3 adapter.

For this test the VMs were connected to the same port group and assigned IP addresses, then iPerf was run with the following options:

{{< code lang="bash" highlight="" title="" >}}
# Client:
iperf -t 30 -c <server> -P 25
# Server:
iperf -s
{{< /code >}}

This gives us a 30 second test with 25 connections, which should be enough to saturate any link.

This is a table of my results for this test. I had a few other servers with different CPU architectures sitting around, so I included those too. Also, where possible I measured the power draw with a [killawatt](http://www.amazon.com/P3-International-P4400-Electricity-Monitor/dp/B00009MDBU) device for curiosity or took the power reading out of the management software.

### NetPerf Results
<table class="table table-bordered table-condensed table-striped">
  <tr>
    <th>CPU</th>
    <th>Avg. Speed</th>
    <th>Power Idle</th>
    <th>Power Load</th>
  </tr>
  <tr>
    <td>Avoton C2750</td>
    <td>8.21 Gbits/sec</td>
    <td>25w</td>
    <td>26w</td>
  </tr>
  <tr>
    <td>Intel i7 920</td>
    <td>17.0 Gbits/sec|</td>
    <td>60w</td>
    <td>160w</td>
  </tr>
  <tr>
    <td>Intel E5540</td>
    <td>16.9 Gbits/sec</td>
    <td>175w</td>
    <td>175w</td>
  </tr>
  <tr>
    <td>AMD Opteron 2385</td>
    <td>6.8 Gbits/s</td>
    <td>Unknown</td>
    <td>Unknown</td>
  </tr>
</table>


I know that this is not a very exhaustive test, but with only one board I can’t yet run something like vmmark. I plan to run something like that in the future when I have a more full blown lab based on these boards set up.  It is enough to convince me to pick a few more up for more investigating!  Also, I am going to add to this chart as I run across different CPU types to test.

## Nested Virtualization

In the comments someone asked if this board supported nested virtualization, the details were sort of un-clear from Intel.  On the Intel ARK page it says that this CPU supports Intel VT but that isn’t the only requirement anymore.  Well, following [William’s guide](http://www.virtuallyghetto.com/2012/09/having-difficulties-enabling-nested.html), I checked the mob for the property ‘nestedHVSupported’ which was true but in order to be thorough I also tested a virtual ESXi host (5.5 inside 5.5) and was able to boot both 32 bit and 64 bit nested guests and they performed pretty well so it looks like this is a definite yes, awesome!

## Conclusion

The thing I found most interesting from these tests is that most of the Intel CPUs get about the same throughput (17GB/s) no matter the age or generation and the AMD CPUs were always substantially slower.  I am not sure if this is always true throughout the history of the two architectures, but I have noticed that Intel CPUs seem to feel faster in the past, even with similar clock speeds.

I think that this little motherboard (and others like it) is a real contender for the home lab where speed isn’t as large as a concern as is power savings.  I plan to load two or three of these up for my BeyondVM lab in the near future – a small and silent ESX farm is really appealing.  I will post updates as I get other performance statistics in the future. Leave a comment below for any test suggestions!

**Update (2/3/14):** Added a section on nested virtualization to answer some questions in the comments.
