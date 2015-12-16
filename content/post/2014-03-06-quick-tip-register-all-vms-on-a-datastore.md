---
title: "Quick Tip: Register all VMs on a datastore"
date: 2014-03-06
author: "ben"
summary: ""
topics:
  - CLI
  - ESXi
  - Quick Tips
tags: [networking,linux,lacp,vlans,cisco]
projects: []
certifications: []
guides: []
sponsors: []
draft: false
comments: true
---
Today I had an entire datastore of VMs to register, probably about 30 in total, and I didn’t want to go through the GUI and register each VM manually.

I came up with this quick unix one-liner:

{{< code lang="bash" highlight="" title="" >}}
# NOTE: My datastore path is /vmfs/volumes/5317a80e-add165f6-ada9-001517599f73
# replace this with whatever datastore needs searching

#VMs
find /vmfs/volumes/5317a80e-add165f6-ada9-001517599f73 -name "*.vmx" -exec  vim-cmd solo/registervm {} \;

#Templates
find /vmfs/volumes/5317a80e-add165f6-ada9-001517599f73 -name "*.vtmx" -exec  vim-cmd solo/registervm {} \;
{{< /code >}}
<!--more-->
Which gave me this:

{{< code lang="bash" highlight="" title="" >}}
/vmfs/volumes/5317a80e-add165f6-ada9-001517599f73 # find /vmfs/volumes/5317a80e-add165f6-ada9-001517599f73 -name "*.vmx" -exec  vim-cmd solo/registervm {} \;
143
144
...
...
...
148
149
/vmfs/volumes/5317a80e-add165f6-ada9-001517599f73 #
{{< /code >}}

There are more elegant ways to do this in PowerCLI that are probably more scaleable (not registering everything on one host, for example) but this is a quick, down and dirty way to get the job done!
