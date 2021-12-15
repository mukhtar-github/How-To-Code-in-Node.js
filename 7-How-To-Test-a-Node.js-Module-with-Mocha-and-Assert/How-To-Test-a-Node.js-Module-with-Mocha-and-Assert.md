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

Our *list()* function returns a copy of the *array* that’s used by the class. It makes a copy of the *array* by using *JavaScript’s destructuring syntax*. We make a copy of the *array* so that changes the user makes to the *array* returned by *list()* does not affect the *array* used by the *Todos* object.

> Note: JavaScript *arrays* are reference types. This means that for any *variable assignment* to an *array or function invocation with an array* as a parameter, JavaScript refers to the *original array* that was created. For example, if we have an *array* with three items called *x*, and create a new *variable y* such that *y = x, y and x* both refer to the same thing. Any changes we make to the *array* with *y* impacts *variable x* and vice versa.

Now let’s write the *add()* function, which adds a new *TODO* item:

```javascript
class Todos {
    constructor() {
        this.todos = [];
    }

    list() {
        return [...this.todos];
    }

    add(title) {
        let todo = {
            title: title,
            completed: false,
        }

        this.todos.push(todo);
    }
}

module.exports = Todos;
```

Our *add()* function takes a string, and places it in a new JavaScript object’s *title* property. The new object also has a *completed* property, which is set to false by default. We then add this new object to our array of TODOs.

Important functionality in a *TODO manager* is to mark items as *completed*. For this implementation, we will loop through our *todos* array to find the *TODO* item the user is searching for. If one is found, we’ll mark it as *completed*. If none is found, we’ll throw an *error*.

Add the *complete()* function like this:

```javascript
class Todos {
    constructor() {
        this.todos = [];
    }

    list() {
        return [...this.todos];
    }

    add(title) {
        let todo = {
            title: title,
            completed: false,
        }

        this.todos.push(todo);
    }

    complete(title) {
        let todoFound = false;
        this.todos.forEach((todo) => {
            if (todo.title === title) {
                todo.completed = true;
                todoFound = true;
                return;
            }
        });

        if (!todoFound) {
            throw new Error(`No TODO was found with the title: "${title}"`);
        }
    }
}

module.exports = Todos;
```

We now have a basic *TODO* manager that we can experiment with. Next, let’s manually test our code to see if the application is working.

## Step 2 — Manually Testing the Code

In this step, we will run our code’s functions and observe the output to ensure it matches our expectations. This is called *manual testing*. It’s likely the most common testing methodology programmers apply. Although we will automate our testing later with *Mocha*, we will first manually test our code to give a better sense of how manual testing differs from testing frameworks.

Let’s add two *TODO* items to our app and mark one as complete. Start the *Node.js REPL* in the same folder as the *index.js* file:

```javascript
node
```

You will see the *>* prompt in the *REPL* that tells us we can enter JavaScript code. Type the following at the prompt:

```javascript
> const Todos = require('./index');
```

With *require()*, we load the *TODOs* module into a *Todos* variable. Recall that our module returns the *Todos* class by default.

Now, let’s instantiate an *object* for that class. In the *REPL*, add this line of code:

```javascript
> const todos = new Todos();
```

We can use the *todos object* to verify our implementation works. Let’s add our first *TODO* item:

```javascript
> todos.add("run code");
```

So far we have not seen any output in our terminal. Let’s verify that we’ve stored our *"run code" TODO* item by getting a *list of all our TODOs*:

```javascript
> todos.list();
```

You will see this output in your *REPL*:

```javascript
// Output
[ { title: 'run code', completed: false } ]
```

This is the expected result: We have one *TODO* item in our *array of TODOs*, and it’s not completed by default.

Let’s add another *TODO* item:

```javascript
> todos.add("test everything");
```

Mark the first *TODO item as completed*:

```javascript
> todos.complete("run code");
```

Our *todos object* will now be managing two items: *"run code" and "test everything"*. The *"run code" TODO* will be *completed* as well. Let’s confirm this by calling *list()* once again:

```javascript
> todos.list();
```

The *REPL* will output:

```javascript
// Output
[
  { title: 'run code', completed: true },
  { title: 'test everything', completed: false }
]
```

Now, exit the *REPL* with the following:

```javascript
> .exit
```

We’ve confirmed that our *module* behaves as we expect it to. While we didn’t put our code in a *test file* or use a *testing library*, we did *test our code manually*. Unfortunately, this form of *testing* becomes time consuming to do every time we make a change. Next, let’s use *automated testing* in *Node.js* and see if we can solve this problem with the *Mocha testing framework*.

## Step 3 — Writing Your First Test with Mocha and Assert

In the last step, we *manually tested our application*. This will work for individual use cases, but as our *module* scales, this method becomes less viable. As we *test* new features, we must be certain that the added functionality has not created problems in the old functionality. We would like to *test* each feature over again for every change in the code, but doing this by hand would take a lot of effort and would be *prone to error*.

A more efficient practice would be to set up *automated tests*. These are *scripted tests* written like any other code block. We run our functions with *defined inputs and inspect their effects* to ensure they behave as we expect. As our codebase grows, so will our *automated tests*. When we write new tests alongside the features, we can verify the entire *module* still works—all without having to remember how to use each function every time.

In this tutorial, we’re using the *Mocha testing framework* with the *Node.js assert module*. Let’s get some hands-on experience to see how they work together.

To begin, create a new file to store our test code:

```javascript
touch index.test.js
```

Now use your preferred *text editor* to open the *test file*. You can use vim like before:

```javascript
vim index.test.js
```

In the first line of the *test file*, we will load the *TODOs module* like we did in the *Node.js shell*. We will then load the *assert module* for when we write our *tests*. Add the following lines:

```javascript
const Todos = require('./index');
const assert = require('assert').strict;
```

The *strict* property of the *assert module* will allow us to use *special equality tests* that are recommended by *Node.js* and are good for *future-proofing*, since they account for more use cases.

Before we go into *writing tests*, let’s discuss how *Mocha* organizes our code. Tests structured in *Mocha* usually follow this template:

```javascript
describe([String with Test Group Name], function() {
    it([String with Test Name], function() {
        [Test Code]
    });
});
```

Notice two key functions: *describe() and it()*. The *describe() function* is used to group similar tests. It’s not required for *Mocha* to run tests, but grouping tests make our test code easier to maintain. It’s recommended that you group your tests in a way that’s easy for you to update similar ones together.

The *it()* contains our test code. This is where we would interact with our *module’s functions* and use the *assert library*. Many *it() functions* can be defined in a *describe() function*.

Our goal in this section is to use *Mocha and assert* to automate our manual test. We’ll do this step-by-step, beginning with our *describe block*. Add the following to your file after the *module* lines:

```javascript
...
describe("integration test", function() {
});
```
