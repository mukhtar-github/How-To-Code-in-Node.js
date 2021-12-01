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

The *REPL* is a quick way to test JavaScript code without having to create a file. Almost every valid JavaScript or Node.js expression can be executed in the *REPL*.

In the previous step you already tried out addition of two numbers, now let’s try division. To do so, start a new *REPL*:

```javascript
node
```

In the prompt type:

```javascript
> 10 / 5
```

Press ENTER , and the output will be 2, as expected:

```javascript
2
```

The REPL can also process operations on *strings*. Concatenate the following *strings* in your *REPL* by typing:

```javascript
> "Hello " + "World"
```

Again, press ENTER, and the string expression is evaluated:

```javascript
'Hello World'
```

> Note: You may have noticed that the output used single quotes instead of double quotes. In JavaScript, the quotes used for a string do not affect its value. If the string you entered used a single quote, the REPL is smart enough to use double quotes in the output.

### Calling Functions

When writing *Node.js* code, it’s common to print messages via the global *console.log* method or a similar *function*. Type the following at the prompt:

```javascript
> console.log('Hi')
```

Pressing ENTER yields the following output:

```javascript
Hi
undefined
```

The first result is the output from *console.log*, which prints a message to the *stdout* stream (the screen). Because *console.log* prints a string instead of returning a string, the message is seen without quotes. The *undefined* is the return value of the function.

### Creating Variables

Rarely do you just work with literals in JavaScript. Creating a variable in the *REPL* works in the same fashion as working with *.js* files. Type the following at the prompt:
