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

This *Node.js* application listens on the specified address *(localhost)* and port *(3000)*, and returns *“Hello World!”* with a *200 HTTP* success code. Since we’re listening on *localhost*, remote clients won’t be able to connect to our application.

To test your application, type:

```javascript
node hello.js
```

You will receive the following output:

```javascript
Output
Server running at http://localhost:3000/
```

> Note: Running a *Node.js* application in this manner will block additional commands until the application is killed by pressing *CTRL+C*.

To test the application, open another terminal session on your server, and connect to *localhost* with *curl*:

```javascript
curl http://localhost:3000
```

If you get the following output, the application is working properly and listening on the correct address and port:

```javascript
Output
Hello World!
```

If you do not get the expected output, make sure that your *Node.js* application is running and configured to listen on the proper address and port.

## Step 3 — Installing PM2

Next let’s install *PM2*, a process manager for Node.js applications. *PM2* makes it possible to daemonize applications so that they will run in the background as a service.

Use *npm* to install the latest version of *PM2* on your server:

```javascript
sudo npm install pm2@latest -g
```

The *-g* option tells *npm* to install the module *globally*, so that it’s available system-wide.

Let’s first use the *pm2 start* command to run your application, *hello.js*, in the background:

```javascript
pm2 start hello.js
```

This also adds your application to *PM2*’s process list, which is outputted every time you start an application:

```javascript
Output
...
[PM2] Spawning PM2 daemon with pm2_home=/home/sammy/.pm2
[PM2] PM2 Successfully daemonized
[PM2] Starting /home/sammy/hello.js in fork_mode (1 instance)
[PM2] Done.
┌────┬────────────────────┬──────────┬──────┬───────────┬──────────┬──────────┐
│ id │ name               │ mode     │ ↺    │ status    │ cpu      │ memory   │
├────┼────────────────────┼──────────┼──────┼───────────┼──────────┼──────────┤
│ 0  │ hello              │ fork     │ 0    │ online    │ 0%       │ 25.2mb   │
└────┴────────────────────┴──────────┴──────┴───────────┴──────────┴──────────┘
```

As indicated above, *PM2* automatically assigns an *App name* (based on the filename, without the *.js* extension) and a *PM2 id*. *PM2* also maintains other information, such as the *PID* of the process, its current status, and memory usage.

Applications that are running under *PM2* will be restarted automatically if the application crashes or is killed, but we can take an additional step to get the application to launch on system *startup* using the *startup* subcommand. This subcommand generates and configures a *startup* script to launch *PM2* and its managed processes on server boots:

```javascript
pm2 startup systemd
```

The last line of the resulting output will include a command to run with superuser privileges in order to set *PM2* to start on boot:

```javascript
Output
[PM2] Init System found: systemd
sammy
[PM2] To setup the Startup Script, copy/paste the following command:
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u sammy --hp /home/sammy
```

Run the command from the output, with your username in place of *sammy*:

```javascript
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u sammy --hp /home/sammy
```

As an additional step, we can save the *PM2* process list and corresponding environments:

```javascript
pm2 save
```

You have now created a *systemd unit* that runs *pm2* for your user on boot. This *pm2* instance, in turn, runs *hello.js*.

Start the service with *systemctl*:

```javascript
sudo systemctl start pm2-sammy
```

If at this point you encounter an error, you may need to reboot, which you can achieve with *sudo reboot*.

Check the status of the *systemd unit*:

```javascript
systemctl status pm2-sammy
```

For a detailed overview of *systemd*, please review *Systemd Essentials: Working with Services, Units, and the Journal*.

In addition to those we have covered, *PM2* provides many subcommands that allow you to manage or look up information about your applications.

Stop an application with this command (specify the *PM2 App name or id*):

```javascript
pm2 stop app_name_or_id
```

Restart an application:

```javascript
pm2 restart app_name_or_id
```

List the applications currently managed by *PM2*:

```javascript
pm2 list
```

Get information about a specific application using its *App name*:

```javascript
pm2 info app_name
```

The *PM2* process monitor can be pulled up with the *monit* subcommand. This displays the *application status, CPU, and memory usage*:

```javascript
pm2 monit
```


