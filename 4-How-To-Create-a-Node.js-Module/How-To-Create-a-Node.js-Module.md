# How To Create a Node.js Module

## Introduction

In *Node.js*, a *module* is a collection of JavaScript functions and objects that can be used by external applications. Describing a piece of code as a *module* refers less to what the code is and more to what it does -- any *Node.js* file or collection of files can be considered a *module* if its functions and data are made usable to external programs.

Because *modules* provide units of functionality that can be reused in many larger programs, they enable you to create loosely coupled applications that scale with complexity, and open the door for you to share your code with other developers. Being able to write *modules* that export useful functions and data will allow you to contribute to the wider *Node.js* community—in fact, all packages that you use on npm were bundled and shared as *modules*.

> This makes creating *modules* an essential skill for a *Node.js* developer.

In this tutorial, you will create a *Node.js module* that suggests what *color web developers* should use in their designs. You will develop the *module* by storing the *colors* as an array, and providing a function to retrieve one randomly. Afterwards, you will run through various ways of importing a *module* into a *Node.js* application.

## Step 1 — Creating a Module

This step will guide you through creating your first *Node.js module*. Your *module* will contain a collection of *colors* in an array and provide a function to get one at random. You will use the *Node.js* built-in exports property to make the *function and array* available to external programs.

First, you’ll begin by deciding what data about *colors* you will store in your *module*. Every *color* will be an object that contains a *name property* that humans can easily identify, and a *code property* that is a string containing an *HTML color code*. *HTML color codes* are *six-digit hexadecimal numbers* that allow you to change the *color of elements on a web page*. You can learn more about *HTML color codes* by reading this *HTML Color Codes and Names* article.

You will then decide what *colors* you want to support in your *module*. Your *module* will contain an array called *allColors* that will contain *six colors*. Your *module* will also include a function called *getRandomColor()* that will randomly select a *color* from your array and return it.

In your terminal, make a new folder called *colors* and move into it:

```javascript
mkdir colors
cd colors
```

Initialize npm so other programs can import this *module* later in the tutorial:

```javascript
npm init -y
```

You used the *-y* flag to skip the usual prompts to customize your *package.json*. If this were a *module* you wished to publish to npm, you would answer all these prompts with relevant data, as explained in *How To Use Node.js Modules with npm and package.json*.

In this case, your output will be:

```javascript
// Output
{
  "name": "colors",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

Now, open up a command-line text editor such as vim and create a new file to serve as the entry point for your *module*:

```javascript
vim index.js
```

Your *module* will do a few things. First, you’ll define a *Color class*. Your *Color class* will be instantiated with its name and *HTML code*. Add the following lines to create the class:

```javascript
class Color {
  constructor(name, code) {
    this.name = name;
    this.code = code;
  }
}
```

Now that you have your *data structure for Color*, add some instances into your *module*. Write the following highlighted *array* to your file:

```javascript
const allColors = [
  new Color('brightred', '#E74C3C'),
  new Color('soothingpurple', '#9B59B6'),
  new Color('skyblue', '#5DADE2'),
  new Color('leafygreen', '#48C9B0'),
  new Color('sunkissedyellow', '#F4D03F'),
  new Color('groovygray', '#D7DBDD'),
];
```

Finally, enter a function that randomly selects an item from the allColors array you just created:

```javascript
exports.getRandomColor = () => {
  return allColors[Math.floor(Math.random() * allColors.length)];
}

exports.allColors = allColors;
```

The *exports* keyword references a global object available in every *Node.js module*. All functions and objects stored in a module’s *exports object* are exposed when other *Node.js modules* import it. The *getRandomColor()* function was created directly on the *exports object*, for example. You then added an *allColors* property to the *exports object* that references the local constant *allColors array* created earlier in the script.

When other *modules* import this *module*, both *allColors* and *getRandomColor()* will be exposed and available for usage.

Save and exit the file.

So far, you have created a *module* that contains an *array of colors* and a *function that returns one randomly*. You have also *exported the array and function*, so that external programs can use them. In the next step, you will use your *module* in other applications to demonstrate the effects of *export*.

## Step 2 — Testing your Module with the REPL

Before you build a complete application, take a moment to confirm that your *module* is working. In this step, you will use the *REPL* to load the *colors module*. While in the *REPL*, you will call the *getRandomColor()* function to see if it behaves as you expect it to.

Start the *Node.js REPL* in the same folder as the *index.js* file:

```javascript
node
```

When the *REPL* has started, you will see the *>* prompt. This means you can enter *JavaScript code* that will be immediately evaluated. If you would like to read more about this, follow our guide on *using the REPL*.

First, enter the following:

```javascript
colors = require('./index');
```

In this command, *require()* loads the *colors module* at its entry point. When you press *ENTER* you will get:

```javascript
// Output
{
  getRandomColor: [Function],
  allColors: [
    Color { name: 'brightred', code: '#E74C3C' },
    Color { name: 'soothingpurple', code: '#9B59B6' },
    Color { name: 'skyblue', code: '#5DADE2' },
    Color { name: 'leafygreen', code: '#48C9B0' },
    Color { name: 'sunkissedyellow', code: '#F4D03F' },
    Color { name: 'groovygray', code: '#D7DBDD' }
  ]
}
```

The *REPL* shows us the value of *colors*, which are all the *functions and objects imported* from the *index.js* file. When you use the *require* keyword, *Node.js* returns all the contents within the *exports* object of a *module*.

Recall that you added *getRandomColor() and allColors* to *exports* in the *colors module*. For that reason, you see them both in the *REPL* when they are *imported*.

At the prompt, test the *getRandomColor()* function:

```javascript
colors.getRandomColor();
```

You’ll be prompted with a random color:

```javascript
// Output
Color { name: 'leafygreen', code: '#48C9B0' }
```

As the *index is random*, your output may vary. Now that you confirmed that the *colors module* is working, exit the *Node.js REPL*:

```javascript
.exit
```

This will return you to your terminal command line.

You have just confirmed that your module works as expected using the *REPL*. Next, you will apply these same concepts and load your *module* into an application, as you would do in a *real project*.

## Step 3 — Saving your Local Module as a Dependency

While testing your *module* in the *REPL*, you imported it with a *relative path*. This means you used the location of the *index.js* file in relation to the working directory to get its contents. While this works, it is usually a better programming experience to *import modules* by their *names* so that the *import* is not broken when the context is changed. In this step, you will install the *colors module* with *npm’s local module install feature*.

Set up a new *Node.js module* outside the *colors* folder. First, go to the previous directory and create a new folder:

```javascript
cd ..
mkdir really-large-application
```

Now move into your new project:

```javascript
cd really-large-application
```

Like with the colors module, initialize your folder with npm:

```javascript
npm init -y
```

The following *package.json* will be generated:

```javascript
// Output
{
  "name": "really-large-application",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```