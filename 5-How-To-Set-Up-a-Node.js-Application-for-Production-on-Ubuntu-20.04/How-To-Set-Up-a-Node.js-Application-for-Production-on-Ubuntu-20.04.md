# How To Set Up a Node.js Application for Production on Ubuntu 20.04

## Introduction

*Node.js* is an *open-source JavaScript runtime environment* for building *server-side and networking applications*. The platform runs on *Linux, macOS, FreeBSD, and Windows*. Though you can run *Node.js* applications at the command line, this tutorial will focus on running them *as a service*. This means that they will *restart on reboot or failure* and are safe for use in a *production environment*.

> A *Network Application* is any application running on one host providing communication to another application running on a different host. Network applications allow network operators to easily manage and monitor network traffic as well as analyze data that can be used to improve network systems.

In this tutorial, you will set up a *production-ready Node.js* environment on a single *Ubuntu 20.04 server*. This server will run a *Node.js* application managed by *PM2*, and provide users with secure access to the application through an *Nginx* reverse proxy. The *Nginx* server will offer HTTPS using a free certificate provided by *Let’s Encrypt*.
