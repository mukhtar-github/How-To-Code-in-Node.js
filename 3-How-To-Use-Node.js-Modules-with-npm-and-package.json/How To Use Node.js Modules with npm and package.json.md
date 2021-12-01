# How To Use Node.js Modules with npm and package.json

## Introduction

Because of such features as its speedy *Input/Output (I/O)* performance and its well-known JavaScript syntax, *Node.js* has quickly become a popular runtime environment for *back-end* web development. But as interest grows, larger applications are built, and managing the complexity of the *codebase and its dependencies* becomes more difficult. *Node.js* organizes this complexity using *modules*, which are any single JavaScript files containing functions or objects that can be used by other programs or *modules*.

> A collection of one or more *modules* is commonly referred to as a *package*, and these *packages* are themselves organized by *package managers*.

The *Node.js Package Manager (npm)* is the default and most popular *package manager* in the *Node.js* ecosystem, and is primarily used to *install and manage* external *modules* in a *Node.js* project. It is also commonly used to install a wide range of *CLI* tools and run *project scripts*. *npm* tracks the *modules* installed in a project with the *package.json* file, which resides in a project’s directory and contains:

* All the modules needed for a project and their installed versions
* All the metadata for a project, such as the author, the license, etc.
* Scripts that can be run to automate tasks within the project

As you create more complex *Node.js* projects, managing your *metadata and dependencies* with the *package.json* file will provide you with more predictable builds, since all external *dependencies* are kept the same. The file will keep track of this information automatically; while you may change the file directly to update your *project’s metadata*, you will seldom need to interact with it directly to *manage modules*.

In this tutorial, you will manage *packages with npm*. The first step will be to create and understand the *package.json* file. You will then use it to keep track of all the *modules* you install in your project. Finally, you will list your *package dependencies*, update your *packages*, uninstall your *packages*, and perform an audit to find security flaws in your *packages*.

## Step 1 — Creating a package.json File

We begin this tutorial by setting up the *example project* — a fictional *Node.js locator module* that gets the user’s *IP* address and returns the *country of origin*. You will not be coding the *module* in this tutorial. However, the *packages* you manage would be relevant if you were developing it.

First, you will create a package.json file to store useful metadata about the project and help you manage the project’s dependent Node.js modules. As the suffix suggests, this is a JSON (JavaScript Object Notation) file. JSON is a standard format used for sharing, based on JavaScript objects and consisting of data stored as key-value pairs. If you would like to learn more about JSON, read our Introduction to JSON article.

Since a package.json file contains numerous properties, it can be cumbersome to create manually, without copy and pasting a template from somewhere else. To make things easier, npm provides the init command. This is an interactive command that asks you a series of questions and creates a package.json file based on your answers.
