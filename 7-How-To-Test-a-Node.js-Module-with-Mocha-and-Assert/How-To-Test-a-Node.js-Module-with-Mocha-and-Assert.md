# How To Test a Node.js Module with Mocha and Assert

## Introduction

Testing is an integral part of software development. It’s common for programmers to run code that tests their application as they make changes in order to confirm it’s behaving as they’d like. With the right test setup, this process can even be automated, saving a lot of time. Running tests consistently after writing new code ensures that new changes don’t break pre-existing features. This gives the developer confidence in their code base, especially when it gets deployed to production so users can interact with it.

A test framework structures the way we create test cases. *Mocha* is a popular JavaScript test framework that organizes our test cases and runs them for us. However, *Mocha* does not verify our code’s behavior. To compare values in a test, we can use the *Node.js assert* module.

In this article, you’ll write tests for a *Node.js TODO #1 list* module. You will set up and use the *Mocha test* framework to structure your tests. Then you’ll use the *Node.js assert* module to create the tests themselves. In this sense, you will be using *Mocha as a plan builder, and assert to implement the plan*.
