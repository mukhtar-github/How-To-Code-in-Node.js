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

```javascript
> let age = 30
```

Pressing ENTER results in:

```javascript
undefined
```

Like before, with *console.log*, the return value of this command is undefined. The *age* variable will be available until you exit the *REPL* session. For example, you can multiply *age* by *two*. Type the following at the prompt and press *ENTER*:

```javascript
> age * 2
```

The result is:

```javascript
60
```

Because the *REPL* returns values, you don’t need to use *console.log* or similar functions to see the output on the screen. By default, any returned value will appear on the screen.

### Multi-line Blocks

Multi-line blocks of code are supported as well. For example, you can create a function that adds 3 to a given number. Start the function by typing the following:

```javascript
> const add3 = (num) => {
```

Then, pressing ENTER will change the prompt to:

```javascript
...
```

The *REPL* noticed an open curly bracket and therefore assumes you’re writing more than one line of code, which needs to be indented. To make it easier to read, the *REPL* adds 3 dots and a space on the next line, so the following code appears to be indented.

Enter the second and third lines of the function, one at a time, pressing ENTER after each:

```javascript
... return num + 3;
... }
```

Pressing ENTER after the closing curly bracket will display an *undefined*, which is the *“return value”* of the function assignment to a variable. The *...* prompt is now gone and the *>* prompt returns:

```javascript
undefined
> 
```

Now, call add3() on a value:

```javascript
> add3(10)
```

As expected, the output is:

```javascript
13
```

You can use the *REPL* to try out bits of JavaScript code before including them into your programs. The *REPL* also includes some handy shortcuts to make that process easier.

