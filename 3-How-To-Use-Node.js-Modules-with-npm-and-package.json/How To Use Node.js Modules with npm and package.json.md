# How To Use Node.js Modules with npm and package.json

## Introduction

Because of such features as its speedy *Input/Output (I/O)* performance and its well-known JavaScript syntax, *Node.js* has quickly become a popular runtime environment for *back-end* web development. But as interest grows, larger applications are built, and managing the complexity of the *codebase and its dependencies* becomes more difficult. *Node.js* organizes this complexity using *modules*, which are any single JavaScript files containing functions or objects that can be used by other programs or *modules*.

> A collection of one or more *modules* is commonly referred to as a *package*, and these *packages* are themselves organized by *package managers*.

The *Node.js Package Manager (npm)* is the default and most popular *package manager* in the *Node.js* ecosystem, and is primarily used to *install and manage* external *modules* in a *Node.js* project. It is also commonly used to install a wide range of *CLI* tools and run *project scripts*. *npm* tracks the *modules* installed in a project with the *package.json* file, which resides in a project’s directory and contains:

* All the modules needed for a project and their installed versions
* All the metadata for a project, such as the *author*, the license, etc.
* Scripts that can be run to automate tasks within the project

As you create more complex *Node.js* projects, managing your *metadata and dependencies* with the *package.json* file will provide you with more predictable builds, since all external *dependencies* are kept the same. The file will keep track of this information automatically; while you may change the file directly to update your *project’s metadata*, you will seldom need to interact with it directly to *manage modules*.

In this tutorial, you will manage *packages with npm*. The first step will be to create and understand the *package.json* file. You will then use it to keep track of all the *modules* you install in your project. Finally, you will list your *package dependencies*, update your *packages*, uninstall your *packages*, and perform an audit to find security flaws in your *packages*.

## Step 1 — Creating a package.json File

We begin this tutorial by setting up the *example project* — a fictional *Node.js locator module* that gets the user’s *IP* address and returns the *country of origin*. You will not be coding the *module* in this tutorial. However, the *packages* you manage would be relevant if you were developing it.

First, you will create a *package.json* file to store useful metadata about the project and help you manage the project’s dependent *Node.js modules*. As the suffix suggests, this is a *JSON (JavaScript Object Notation) file*. *JSON* is a standard format used for sharing, based on JavaScript objects and consisting of data stored as *key-value pairs*. If you would like to learn more about *JSON*, read our Introduction to *JSON* article.

Since a *package.json* file contains numerous properties, it can be cumbersome to create manually, without copy and pasting a template from somewhere else. To make things easier, npm provides the *init* command. This is an interactive command that asks you a series of questions and creates a *package.json* file based on your answers.

### Using the init Command

First, set up a project so you can practice managing modules. In your shell, create a new folder called *locator*:

```javascript
mkdir locator
```

Then move into the new folder:

```javascript
cd locator
```

Now, initialize the interactive prompt by entering:

```javascript
npm init
```

#### Outsourced Info

> Before you add any *Node packages* to your application, you need to create a file that is called *package.json*. *Package.json* is basically a *json* file that includes some basic information about your application or your project, such as it's *name*, it's *version*, it's *authors* and so on. It's basically a bunch of metadata about your application. And all *Node applications* by standard have this *package.json* file. Moreover, before adding any *node packages* to your application, you need to create a *package.json* file. So, as a best practice whenever you start a *Node project*, you need to run *npm-init* to create *package.json*. The faster way to create a *package.json* file is to supply the flag **npm init --yes**.

The next field is **description** — a useful string to explain what your *Node.js module* does. Our fictional *locator project* would get the user’s *IP address* and return the country of origin. A fitting *description* would be *"Finds the country of origin of the incoming request"*, so type in something like this and press ENTER. The *description* is very useful when people are searching for your module.

After the repository prompt, the command asks for **keywords**. This property is an array of strings with useful terms that people can use to find your repository. It’s best to have a small set of words that are really relevant to your project, so that searching can be more targeted. List these *keywords* as a string with commas separating each value. For this sample project, type *"ip","geo","country"* at the prompt. The finished *package.json* will have three items in the array for *keywords*.

The next field in the prompt is **author**. This is useful for users of your module who want to get in contact with you. For example, if someone discovers an exploit in your module, they can use this to report the problem so that you can fix it. The *author* field is a string in the following format: *"Name - Email - (Website)". For example, "Sammy -- sammy@your_domain -- (<https://your_domain>)"* is a valid *author*. The email and website data are optional — a valid *author* could just be a name.

Now that you have your package.json file, you can test out installing modules in the next step.

## Step 2 — Installing Modules

It is common in software development to use external libraries to perform ancillary tasks in projects. This allows the developer to focus on the business logic and create the application more quickly and efficiently.

For example, if our sample *locator* module has to make an external *API* request to get *geographical data*, we could use an *HTTP* library to make that task easier. Since our main goal is to return *pertinent geographical data to the user*, we could install a *package* that makes *HTTP* requests easier for us instead of rewriting this code for ourselves, a task that is beyond the scope of our project.

Let’s run through this example. In your *locator* application, you will use the *axios library*, which will help you make *HTTP* requests. Install it by entering the following in your shell:

```javascript
npm install axios --save
```

### Development Dependencies

Packages that are used for the development of a project but not for building or running it in production are called development dependencies. They are not necessary for your module or application to work in production, but may be helpful while writing the code.

For example, it’s common for developers to use code linters to ensure their code follows best practices and to keep the style consistent. While this is useful for development, this only adds to the size of the distributable without providing a tangible benefit when deployed in production.

Install a linter as a development dependency for your project. Try this out in your shell:

```javascript
npm i eslint@6.0.0 --save-dev
```

In this command, you used the *--save-dev* flag. This will save eslint as a dependency that is only needed for development. Notice also that you added *@6.0.0* to your dependency name. When modules are updated, they are tagged with a version. The @ tells npm to look for a specific tag of the module you are installing. Without a specified tag, npm installs the latest tagged version. Open *package.json* again:
