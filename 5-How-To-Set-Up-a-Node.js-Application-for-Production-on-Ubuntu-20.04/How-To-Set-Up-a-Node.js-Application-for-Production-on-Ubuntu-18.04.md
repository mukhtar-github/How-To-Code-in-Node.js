# How To Set Up a Node.js Application for Production on Ubuntu 20.04

## Introduction

*Node.js* is an *open-source JavaScript runtime environment* for building *server-side and networking applications*. The platform runs on *Linux, macOS, FreeBSD, and Windows*. Though you can run *Node.js* applications at the command line, this tutorial will focus on running them *as a service*. This means that they will *restart on reboot or failure* and are safe for use in a *production environment*.

> *A Network Application is any application running on one host providing communication to another application running on a different host*. Network applications allow network operators to easily manage and monitor network traffic as well as analyze data that can be used to improve network systems.

In this tutorial, you will set up a *production-ready Node.js* environment on a single *Ubuntu 20.04 server*. This server will run a *Node.js* application managed by *PM2*, and provide users with secure access to the application through an *Nginx reverse proxy*. The *Nginx server* will offer *HTTPS* using a free certificate provided by *Let’s Encrypt*.

## Prerequisites

This guide assumes that you have the following:

* An Ubuntu 20.04 server setup, as described in the initial server setup guide for Ubuntu 20.04. You should have a *non-root user with sudo privileges and an active firewall*.
* A domain name pointed at your server’s public IP. This tutorial will use the domain name *example.com* throughout.
* *Nginx* installed, as covered in How To Install *Nginx* on Ubuntu 20.04.
* *Nginx* configured with SSL using Let’s Encrypt certificates. *How To Secure Nginx with Let’s Encrypt on Ubuntu 20.04* will  walk you through the process.

When you’ve completed the prerequisites, you will have a server serving your domain’s default placeholder page at <https://example.com/>.

## Step 1 — Installing Node.js

Let’s begin by installing the latest LTS release of *Node.js*, using the NodeSource package archives.

First, install the NodeSource PPA in order to get access to its contents. Make sure you’re in your home directory, and use *curl* to retrieve the installation script for the most recent LTS version of *Node.js* from its archives.

```javascript
cd ~
curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh
```

You can inspect the contents of this script with vim or your preferred text editor:

```javascript
vim nodesource_setup.sh
```

The PPA will be added to your configuration and your local package cache will be updated automatically. After running the setup script from Nodesource, you can install the Node.js package:

```javascript
sudo apt install nodejs
```

To check which version of Node.js you have installed after these initial steps, type:

```javascript
node -v
```

> Note: When installing from the NodeSource PPA, the Node.js executable is called nodejs, rather than node.

The *nodejs* package contains the *nodejs* binary as well as *npm*, a package manager for Node modules, so you don’t need to install *npm* separately.

*npm* uses a configuration file in your home directory to keep track of updates. It will be created the first time you run *npm*. Execute this command to verify that *npm* is installed and to create the configuration file:

```javascript
npm -v
```

In order for some *npm* packages to work (those that require compiling code from source, for example), you will need to install the *build-essential* package:

```javascript
sudo apt install build-essential
```

You now have the necessary tools to work with *npm* packages that require compiling code from source.

With the Node.js runtime installed, let’s move on to writing a *Node.js* application.

## Step 2 — Creating a Node.js Application

Let’s write a *Hello World* application that returns “*Hello World*” to any *HTTP* requests. This sample application will help you get *Node.js* set up. You can replace it with your *own application* — just make sure that you modify your application to listen on the appropriate *IP addresses and ports*.

First, let’s create a sample application called *hello.js*:

```javascript
cd ~
vim hello.js
```

Insert the following code into the file:

```javascript
const http = require('http');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```


