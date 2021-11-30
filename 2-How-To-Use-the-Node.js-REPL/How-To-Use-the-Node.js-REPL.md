# How To Use the Node.js REPL

## Introduction

The *Node.js Read-Eval-Print-Loop (REPL)* is an interactive shell that processes *Node.js* expressions. The shell reads JavaScript code the user enters, evaluates the result of interpreting the line of code, prints the result to the user, and loops until the user signals to quit.

The REPL is bundled with with every *Node.js* installation and allows you to quickly test and explore JavaScript code within the Node environment without having to store it in a file.

## Step 1 — Starting and Stopping the REPL

If you have *node* installed, then you also have the *Node.js REPL*. To start it, simply enter *node* in your command line shell:

```javascript
node
```

This results in the REPL prompt:

```javascript
>
```

The *>* symbol lets you know that you can enter JavaScript code to be immediately evaluated.

For an example, try adding two numbers in the *REPL* by typing this:

```javascript
> 2 + 2
```

When you press ENTER, the REPL will evaluate the expression and return:

```javascript
4
```

To exit the *REPL*, you can type *.exit*, or press *CTRL+D* once, or press *CTRL+C* twice, which will return you to the shell prompt.

With starting and stopping out of the way, let’s take a look at how you can use the REPL to execute simple JavaScript code.

## Step 2 — Executing Code in the Node.js REPL


