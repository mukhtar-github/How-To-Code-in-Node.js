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

In this command, you used the *--save-dev* flag. This will save eslint as a dependency that is only needed for development. Notice also that you added *@6.0.0* to your dependency name. When modules are updated, they are tagged with a version. The @ tells *npm* to look for a specific tag of the module you are installing. Without a specified tag, *npm* installs the latest tagged version. Open *package.json* again:

### Automatically Generated Files: *node_modules* and *package-lock.json*

When you first install a *package* to a *Node.js project, npm* automatically creates the *node_modules* folder to store the modules needed for your project and the *package-lock.json* file.

The *node_modules* folder contains every installed dependency for your project. In most cases, you should *not* commit this folder into your version controlled repository. As you install more *dependencies*, the size of this folder will quickly grow. Furthermore, the *package-lock.json* file keeps a record of the exact versions installed in a more succinct way, so including *node_modules* is not necessary.

While the *package.json* file lists *dependencies* that tell us the suitable versions that should be installed for the project, the *package-lock.json* file keeps track of all changes in *package.json* or *node_modules* and tells us the exact version of the *package* installed. You usually commit this to your version controlled repository instead of *node_modules*, as it’s a cleaner representation of all your *dependencies*.

### Installing from package.json

With your *package.json* and *package-lock.json* files, you can quickly set up the same *project dependencies* before you start development on a *new project*. To demonstrate this, move up a level in your directory tree and create a new folder named *cloned_locator* in the same directory level as *locator*:

```javascript
cd ..
mkdir cloned_locator
```

Move into your new directory:

```javascript
cd cloned_locator
```

Now copy the package.json and package-lock.json files from locator to cloned_locator:

```javascript
cp ../locator/package.json ../locator/package-lock.json .
```

To install the required modules for this project, type:

```javascript
npm i
```

npm will check for a package-lock.json file to install the modules. If no lock file is available, it would read from the package.json file to determine the installations. It is usually quicker to install from package-lock.json, since the lock file contains the exact version of modules and their dependencies, meaning npm does not have to spend time figuring out a suitable version to install.

When deploying to production, you may want to skip the development dependencies. Recall that development dependencies are stored in the *devDependencies* section of package.json, and have no impact on the running of your app. When installing modules as part of the CI/CD process -- (CI/CD is a method to frequently deliver apps to customers by introducing automation into the stages of app development) -- to deploy your application, omit the dev dependencies by running:

```javascript
npm i --production
```

The *--production* flag ignores the *devDependencies* section during installation. For now, stick with your development build.

Before moving to the next section, return to the *locator* folder:

```javascript
cd ../locator
```

### Global Installations

So far, you have been installing *npm modules* for the *locator* project. *npm* also allows you to install *packages* globally. This means that the *package* is available to your user in the wider system, like any other shell command. This ability is useful for the many *Node.js* modules that are *CLI* tools.

For example, you may want to blog about the *locator* project that you’re currently working on. To do so, you can use a library like *Hexo* to create and manage your static *website blog*. Install the *Hexo CLI* globally like this:

```javascript
npm i hexo-cli -g
```

To install a package globally, you append the -g flag to the command.

> Note: If you get a permission error trying to install this package globally, your system may require super user privileges to run the command. Try again with *sudo npm i hexo-cli -g*.

Test that the package was successfully installed by typing:

```javascript
hexo --version
```

So far, you have learned how to install *modules* with *npm*. You can install *packages* to a project locally, either as a *production or development dependency*. You can also install *packages* based on pre-existing *package.json or package-lock.json* files, allowing you to develop with the same *dependencies* as your peers. Finally, you can use the *-g* flag to install *packages* globally, so you can access them regardless of whether you’re in a *Node.js* project or not. Now that you can install *modules*, in the next section you will practice techniques to administer your *dependencies*.

## Step 3 — Managing Modules

A complete *package manager* can do a lot more than install *modules*. *npm* has over 20 commands relating to *dependency management* available. In this step, you will:

* List *modules* you have installed.
* Update *modules* to a more recent version.
* Uninstall *modules* you no longer need.
* Perform a security audit on your *modules* to find and fix security flaws.

While these examples will be done in your locator folder, all of these commands can be run globally by appending the -g flag at the end of them, exactly like you did when installing globally.

### Listing Modules

