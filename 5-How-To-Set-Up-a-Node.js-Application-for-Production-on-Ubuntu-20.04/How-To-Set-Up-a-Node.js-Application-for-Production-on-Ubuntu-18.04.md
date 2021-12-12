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

When you’ve completed the prerequisites, you will have a server serving your domain’s default placeholder page at https://example.com/.

## Step 1 — Installing Node.js

Let’s begin by installing the latest LTS release of *Node.js*, using the NodeSource package archives.

First, install the NodeSource PPA in order to get access to its contents. Make sure you’re in your home directory, and use *curl* to retrieve the installation script for the most recent LTS version of *Node.js* from its archives.
