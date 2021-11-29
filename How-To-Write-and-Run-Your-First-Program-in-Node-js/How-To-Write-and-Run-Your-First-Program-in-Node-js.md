# How To Write and Run Your First Program in Node.js

## Introduction

*Node.js* is a popular open-source runtime environment that can execute *JavaScript* outside of the browser using the V8 *JavaScript* engine, which is the same engine used to power the Google Chrome web browser’s *JavaScript* execution. The Node runtime is commonly used to create command line tools and web servers.

Learning *Node.js* will allow you to write your *front-end* code and your *back-end code* in the same language. Using *JavaScript* throughout your entire stack can help reduce time for context switching, and libraries are more easily shared between your back-end server and *front-end* projects.

Also, thanks to its support for asynchronous execution, *Node.js* excels at I/O-intensive tasks, which is what makes it so suitable for the web. Real-time applications, like video streaming, or applications that continuously send and receive data, can run more efficiently when written in *Node.js*.

In this tutorial you’ll create your first program with the *Node.js* runtime. You’ll be introduced to a few Node-specific concepts and build your way up to create a program that helps users inspect environment variables on their system. To do this, you’ll learn how to output strings to the console, receive input from the user, and access environment variables.

## Step 1 — Outputting to the Console

To write a *“Hello, World!”* program, open up a command line text editor such as *vim* and create a new file:

```javascript
vim hello.js
```

With the text editor opened, enter the following code:

```javascript
console.log("Hello World");
```

The *console* object in *Node.js* provides simple methods to write to *stdout, stderr*, or to any other *Node.js* stream, which in most cases is the *command line*. The *log* method prints to the *stdout* stream, so you can see it in your *console*.

In the context of *Node.js*, *streams* are objects that can either *receive data*, like the *stdout stream*, or objects that can *output data*, like a *network socket or a file*. In the case of the *stdout and stderr streams*, any data sent to them will then be shown in the *console*. One of the great things about *streams* is that they’re easily redirected, in which case you can redirect the *output* of your program to a file, for example.

Save and exit vim by pressing *:wq*. Now your program is ready to run.

## Step 2 — Running the Program

To run this program, use the node command as follows:

```javascript
node hello.js
```

The hello.js program will execute and display the following output:

```javascript
// Output
Hello World
```
