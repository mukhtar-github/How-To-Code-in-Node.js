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

The *Node.js* interpreter read the file and executed *console.log("Hello World");* by calling the *log* method of the global *console* object. The string *"Hello World"* was passed as an argument to the *log* function. Although quotation marks are necessary in the code to indicate that the text is a string, they are not printed to the screen.

Having confirmed that the program works, let’s make it more interactive.

## Step 3 — Receiving User Input via Command Line Arguments

Every time you run the *Node.js “Hello, World!”* program, it produces the same *output*. In order to make the program more dynamic, let’s get *input* from the user and display it on the screen.

*Command line* tools often accept various *arguments* that modify their behavior. For example, running *node* with the *--version argument* prints the *installed version* instead of *running the interpreter*. In this step, you will make your code accept *user input* via *command line arguments*.

Create a new file *arguments.js* with vim:

```javascript
vim arguments.js
```

Enter the following code:

```javascript
console.log(process.argv);
```

The *process object* is a *global Node.js object* that contains *functions and data* all related to the *currently running Node.js process*. The *argv property* is an *array of strings* containing all the *command line arguments* given to a program.

Save and exit vim by pressing *:wq*. Now when you run this program, you provide a command line argument like this:

```javascript
node arguments.js hello world
```

The output looks like the following:

```javascript
[
  '/usr/bin/node',
  '/home/mukhtar/Documents/HowTo-Code-in-Node.js/arguments.js',
  'hello',
  'world'
]
```

The first argument in the *process.argv array* is always the location of the *Node.js binary* that is running the program. The second argument is always the location of the *file being run*. The remaining arguments are what the user entered, in this case: *hello and world*.

We are mostly interested in the arguments that the *user entered*, not the default ones that *Node.js provides*. Open the *arguments.js* file for editing:

```javascript
vim arguments.js
```

Change *console.log(process.arg);* to the following:

```javascript
console.log(process.argv.slice(2));
```

Because *argv* is an array, you can use JavaScript’s built-in *slice method* that returns a selection of elements. When you provide the *slice function with 2 as its argument*, you get all the elements of *argv* that comes after its second element; that is, the arguments the user entered.

Re-run the program with the *node* command and the same arguments as last time:

```javascript
node arguments.js hello world
```

Now, the output looks like this:

```javascript
// Output
[ 'hello', 'world' ]
```
