---
author: ben
certifications: []
comments: true
date: 2015-12-07T18:36:59-07:00
draft: false
guides: []
sponsors: []
projects: []
summary: ""
tags: [nerd,sponsors,blog,starwars]
title: "BeyondVM II: The Blog Awakens"
topics:
  - Announcements
---
It has been quite some time since I have written anything on here (Almost 1.5 years!) and quite a bit has changed in that time. You probably noticed I re-designed the whole site, but what you may not have noticed is that I ported the whole thing to a static blogging engine called [Hugo](http://www.gohugo.io).  This process is something that has been on my to-do list forever and kept me writing anything. The more I wrote the more I would have to convert (Hugo uses Markdown to store its posts, Wordpress does not), so I kept putting it off. More on that later.

I also have shifted the focus of my work towards automation and immutable infrastructure and I have quite a bit to write about the things I have learned doing that I have learned along the way. I am pretty excited about a few of the posts I have brewing on those subjects.
<!--more-->
### Hugo

Just a short blurb about Hugo. Hugo describes itself as

> Hugo is a static HTML and CSS website generator written in Go. It is optimized for speed, easy use and configurability. Hugo takes a directory with content and templates and renders them into a full HTML website.

What this means is that you write posts in markdown (by default) and create templates surrounding the content, and Hugo renders out a fully static website (meaning it renders to plain old HTML). This is a huge advantage because it allows me to host this entire site using services like [Amazon S3](https://aws.amazon.com/s3/) fronted by [Amazon CloudFront](https://aws.amazon.com/cloudfront/) which gives me a really fast, scaleable and cheap hosting solution.  I also found a sweet tool called [Netlify](https://www.netlify.com) that I ended up using because they have a bunch of other tools that I don't have to manually create (minify, etc) but I will include both solutions in the forthcoming article.

I have a blog post in the works about how to build a site using Hugo with some good sane defaults and example code which I found digging around. I also have a set of scripts as well as the template I built for this website that I plan to release shortly (still making some final tweaks).

### Focus
In my recent work, I have had I have found myself becoming more and more interested in automation and automation tools as well as the new buzz-word “DevOps.” It is great that someone coined the term DevOps, because it really is a philosophy I have been trying to work under for much of my career - Ops and Dev should really work together as much as possible, no ‘over the fence’ crap - and its great that other people are talking that way now too.

Over the past year or so I have put quite a bit of time into learning some great tools, and I can’t wait to share some posts on them. Here is a short list of some of the topics I have been learning about:

- Puppet
- Ansible
- AWS
- HashiCorp Vagrant
- HashiCorp Vault
- HashiCorp Packer

I am pretty excited about this new direction and I can't wait to share!

### Missing Posts
You may notice that there is some missing content, I only ported the posts that I thought people would still find valuable, so I may have missed something. If you are looking for a particular post and its missing I do have them all archived.

### Sponsors
Last, I am looking for some sponsors to partner with me in creating the BeyondVM Datacenter, including infrastructure needs and product testing. I am looking to work with like-minded product vendors and software makers. If you want your product to be a part of my test environment, get in touch! I am putting together a neat offering, so if you are interested please let me know

That’s all for now. I have quite a bit of content coming (as well as some other surprises) so stay tuned!
