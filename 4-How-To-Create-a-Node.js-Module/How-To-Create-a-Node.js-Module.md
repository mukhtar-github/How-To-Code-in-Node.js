# How To Create a Node.js Module

## Introduction

In *Node.js*, a *module* is a collection of JavaScript functions and objects that can be used by external applications. Describing a piece of code as a *module* refers less to what the code is and more to what it does -- any *Node.js* file or collection of files can be considered a *module* if its functions and data are made usable to external programs.

Because *modules* provide units of functionality that can be reused in many larger programs, they enable you to create loosely coupled applications that scale with complexity, and open the door for you to share your code with other developers. Being able to write *modules* that export useful functions and data will allow you to contribute to the wider *Node.js* community—in fact, all packages that you use on npm were bundled and shared as *modules*.

> This makes creating *modules* an essential skill for a *Node.js* developer.

In this tutorial, you will create a *Node.js module* that suggests what *color web developers* should use in their designs. You will develop the *module* by storing the *colors* as an array, and providing a function to retrieve one randomly. Afterwards, you will run through various ways of importing a *module* into a *Node.js* application.

## Step 1 — Creating a Module

This step will guide you through creating your first *Node.js module*. Your *module* will contain a collection of *colors* in an array and provide a function to get one at random. You will use the *Node.js* built-in exports property to make the *function and array* available to external programs.

First, you’ll begin by deciding what data about *colors* you will store in your *module*. Every *color* will be an object that contains a *name property* that humans can easily identify, and a *code property* that is a string containing an *HTML color code*. *HTML color codes* are *six-digit hexadecimal numbers* that allow you to change the *color of elements on a web page*. You can learn more about *HTML color codes* by reading this *HTML Color Codes* and *Names article*.

You will then decide what *colors* you want to support in your *module*. Your *module* will contain an array called *allColors* that will contain six *colors*. Your *module* will also include a function called *getRandomColor()* that will randomly select a *color* from your array and return it.

In your terminal, make a new folder called *colors* and move into it:
