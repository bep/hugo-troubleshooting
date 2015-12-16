---
title: "Tutorial: Basic Vagrant Configuration"
date: 2015-12-01
author: "ben"
summary: ""
topics:
  - Tutorials
  - Automation
  - Vagrant
tags: [vagrant,automation,vmware,development,tools]
projects: []
certifications: []
guides: []
sponsors: []
draft: true
comments: true
---
I am probably the last person on earth to discover Vagrant but now I have and it is *awesome*.  I thought it might be useful for someone else to run though a basic vagrant configuration.

<!--more-->

## What is Vagrant?
Vagrant is an automation tool designed for developers looking to create repeatable automated development environments in a text based manor.  To quote [the website](https://www.vagrantup.com/):
> Vagrant is a tool for building complete development environments. With an easy-to-use workflow and focus on automation, Vagrant lowers development environment setup time, increases development/production parity, and makes the "works on my machine" excuse a relic of the past.

Vagrant is a product of the excellent [hashcorp](https://www.hashicorp.com) which makes lots of other products like Packer and Serf.  Check them out.

## Installation
Installation of Vagrant itself is pretty simple, simply go to the [download page](https://www.vagrantup.com/downloads.html) and pick up the binary for your OS and install it.

This will give us the command `vagrant` and this is the help output for it:
```console
~ $ vagrant
Initializing AutoNetwork pool storage.
Usage: vagrant [options] <command> [<args>]

    -v, --version                    Print the version and exit.
    -h, --help                       Print this help.

Common commands:
     box             manages boxes: installation, removal, etc.
     connect         connect to a remotely shared Vagrant environment
     destroy         stops and deletes all traces of the vagrant machine
     global-status   outputs status Vagrant environments for this user
     halt            stops the vagrant machine
     help            shows the help for a subcommand
     init            initializes a new Vagrant environment by creating a Vagrantfile
     login           log in to Vagrant Cloud
     package         packages a running vagrant environment into a box
     plugin          manages plugins: install, uninstall, update, etc.
     provision       provisions the vagrant machine
     rdp             connects to machine via RDP
     reload          restarts vagrant machine, loads new Vagrantfile configuration
     resume          resume a suspended vagrant machine
     share           share your Vagrant environment with anyone in the world
     ssh             connects to machine via SSH
     ssh-config      outputs OpenSSH valid configuration to connect to the machine
     status          outputs status of the vagrant machine
     suspend         suspends the machine
     up              starts and provisions the vagrant environment
     version         prints current and latest Vagrant version

For help on any individual command run `vagrant COMMAND -h`

Additional subcommands are available, but are either more advanced
or not commonly used. To see all subcommands, run the command
`vagrant list-commands`.

~ $

```

### Vagrant VMware Plugin
I am (obviously) a VMware person so I wanted to use [Fusion](vmware.com/fusion) and this is the one caveat with Vagrant, VMware integration for Fusion and Workstation cost some cash.  Either way, its simple to install once you get the license file.

```console Install Fusion Provider

vagrant plugin install vagrant-vmware-fusion

vagrant plugin license vagrant-vmware-fusion license.lic

```
### Vagrant Plugins
There are a TON of plugins to use with Vagrant that perform all kinds of tasks, the following is my list of essential ones (I am not going to cover each of their functions in depth in this article).

* [vagrant-config_builder](https://github.com/adrienthebo/vagrant-config_builder) - Build config files from YAML
* [vagrant-auto_network](https://github.com/adrienthebo/vagrant-auto_network) - Automated Network Provisioning
* [vagrant-puppet-install](https://github.com/petems/vagrant-puppet-install) - Puppet Installer
* [sahara](https://github.com/jedi4ever/sahara) - Snapshot Support
* [landrush](https://github.com/phinze/landrush) - Automated DNS inside and outside of guests
* [vagrant-pristine](https://github.com/fgrehm/vagrant-pristine) - Alias to dump and re-deploy a config
* [vagrant-shell-commander](https://github.com/fgimenez/vagrant-shell-commander) - Parallel shell comands on guests

To install all of these, execute these commands:
```console Install Plugins
vagrant plugin install vagrant-config_builder

vagrant plugin install vagrant-auto_network

vagrant plugin install vagrant-puppet-install

vagrant plugin install sahara

vagrant plugin install landrush

vagrant plugin install vagrant-pristine

vagrant plugin install vagrant-shell-commander

```

If you want to install all of them and you are using ZSH (as you should be), execute this command:
```console Install Plugins
vagrant plugin install {vagrant-config_builder,vagrant-auto_network,vagrant-puppet-install,vagrant-host-shell,sahara,landrush,vagrant-pristine,vagrant-shell-commander}

```

## Puppet
Puppet configuration and usage is beyond the scope of this article, I plan to write more about puppet and puppet configuration in detail in future articles.  For this demo I will just be using a really basic puppet manifest.

## Basic Usage

First, its time to create a basic config structure.  I am using vagrant-config_builder so I need to mirror their directory structure:

```console
.
├── config
│   ├── roles.yaml
│   └── vms.yaml
└── Vagrantfile
```
The following is a one-liner to build out this skeleton:

```console
mkdir conf && touch conf/roles.yaml && touch conf/vms.yaml
```
Next, I am going to use the basic Vagrantfile from the config_builder readme file.
```ruby Vagrantfile
rrequire 'config_builder'
Vagrant.configure('2', &ConfigBuilder.load(
  :yaml_erb,
  :yamldir,
  File.expand_path('../conf', __FILE__)
))
```

For purposes of this demo, I am going to create a simple one VM built of a precise64 image just to demonstrate how things work but keep in mind things can get way more complicated.

```yaml roles.yaml
---
roles:
  normalvm:
    provider:
      type: vmware
      vmx:
        memsize: 512
        numvcpus: 1
```
```yaml vms.yaml
---
vms:
  -
    name: test
    private_networks: [ {ip: '10.20.1.2'} ]
    box: precise-x64
    hostname: test.vagrant.vm
    roles: normalvm
```

Next execute `vagrant up` and watch the magic happen!

```console

```
### Vagrant Cloud
