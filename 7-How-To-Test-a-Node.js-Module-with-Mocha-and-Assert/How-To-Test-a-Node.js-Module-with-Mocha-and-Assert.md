# How To Test a Node.js Module with Mocha and Assert

## Introduction

Testing is an integral part of software development. It’s common for programmers to run code that tests their application as they make changes in order to confirm it’s behaving as they’d like. With the right test setup, this process can even be automated, saving a lot of time. Running tests consistently after writing new code ensures that new changes don’t break pre-existing features. This gives the developer confidence in their code base, especially when it gets deployed to production so users can interact with it.

A test framework structures the way we create test cases. *Mocha* is a popular JavaScript test framework that organizes our test cases and runs them for us. However, *Mocha* does not verify our code’s behavior. To compare values in a test, we can use the *Node.js assert module*.

In this article, you’ll write tests for a *Node.js TODO #1 list module*. You will set up and use the *Mocha test* framework to structure your tests. Then you’ll use the *Node.js assert module* to create the tests themselves. In this sense, you will be using *Mocha as a plan builder, and assert to implement the plan*.

## Step 1 — Writing a Node Module

Let’s begin this article by writing the *Node.js module* we’d like to test. This *module* will manage a *list of TODO items*. Using this *module*, we will be able to list all the *TODOs* that we are keeping track of, add new items, and mark some as complete. Additionally, we’ll be able to export a *list of TODO items* to a *CSV* file. If you’d like a refresher on writing *Node.js modules*, you can read our article on *How To Create a Node.js Module*.

First, we need to set up the coding environment. Create a folder with the name of your project in your terminal. This tutorial will use the name *todos*:

```javascript
mkdir todos
```

Then enter that folder:

```javascript
cd todos
```

Now initialize *npm*, since we’ll be using its *CLI* functionality to run the tests later:

```javascript
npm init -y
```

We only have one dependency, *Mocha*, which we will use to organize and run our tests. To download and install *Mocha*, use the following:

```javascript
npm i request --save-dev mocha
```

We install *Mocha* as a *dev* dependency, as it’s not required by the *module* in a production setting. If you would like to learn more about *Node.js packages or npm*, check out our guide on *How To Use Node.js Modules with npm and package.json*.

Finally, let’s create our file that will contain our *module’s* code:

```javascript
touch index.js
```

With that, we’re ready to create our *module*. Open *index.js* in a text editor like vim:

```javascript
vim index.js
```

Let’s begin by defining the *Todos class*. This class contains all the functions that we need to manage our *TODO list*. Add the following lines of code to *index.js*:

```javascript
class Todos {
    constructor() {
        this.todos = [];
    }
}

module.exports = Todos;
```

We begin the file by creating a *Todos class*. Its *constructor()* function takes no arguments, therefore we don’t need to provide any values to instantiate an object for this class. All we do when we initialize a *Todos object* is create a *todos property* that’s an *empty array*.

The modules line allows other Node.js modules to require our *Todos class*. Without explicitly exporting the class, the test file that we will create later would not be able to use it.

Let’s add a function to return the *array of todos* we have stored. Write in the following highlighted lines:

```javascript
class Todos {
    constructor() {
        this.todos = [];
    }

    list() {
        return [...this.todos];
    }
}

module.exports = Todos;
```

Our *list()* function returns a copy of the *array* that’s used by the class. It makes a copy of the *array* by using *JavaScript’s destructuring syntax*. We make a copy of the *array* so that changes the user makes to the *array* returned by *list()* does not affect the *array* used by the Todos object.

> Note: JavaScript *arrays* are reference types. This means that for any *variable assignment* to an *array or function invocation with an array* as a parameter, JavaScript refers to the *original array* that was created. For example, if we have an *array* with three items called *x*, and create a new *variable y* such that *y = x, y and x* both refer to the same thing. Any changes we make to the *array* with *y* impacts *variable x* and vice versa.
