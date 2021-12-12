# How To Write Asynchronous Code in Node.js

## Introduction

For many programs in *JavaScript*, code is executed as the developer writes it—line by line. This is called *synchronous execution*, because the lines are executed one after the other, in the order they were written. However, not every instruction you give to the computer needs to be attended to immediately. For example, if you send a *network request*, the process executing your code will have to wait for the *data* to return before it can work on it. In this case, time would be wasted if it did not execute other code while waiting for the *network request* to be completed. To solve this problem, developers use *asynchronous programming*, in which lines of code are executed in a different order than the one in which they were written. With *asynchronous programming*, we can execute other code while we wait for long activities like *network request*s to finish.

*JavaScript* code is executed on a *single thread* within a computer process. Its code is processed *synchronously* on this thread, with only *one instruction run at a time*. Therefore, if we were to do a *long-running task* on this thread, all of the remaining code is blocked until the task is complete. By leveraging *JavaScript’s asynchronous programming* features, we can *offload long-running tasks to a background thread* to avoid this problem. When the task is complete, the code we need to process the task’s data is put back on the main *single thread*.

In this tutorial, you will learn how *JavaScript* manages *asynchronous* tasks with help from the *Event Loop*, which is a *JavaScript* construct that completes a new task while waiting for another. You will then create a program that uses *asynchronous* programming to request a list of movies from a *Studio Ghibli API* and save the data to a *CSV file*. The *asynchronous* code will be written in three ways: *callbacks, promises, and with the async/await* keywords.

> Note: As of this writing, *asynchronous programming* is no longer done using only *callbacks*, but learning this obsolete method can provide great context as to why the *JavaScript* community now uses *promises*. The *async/await* keywords enable us to use *promises* in a less verbose way, and are thus the standard way to do *asynchronous programming* in *JavaScript* at the time of writing this article.

## The Event Loop

Let’s begin by studying the internal workings of *JavaScript* function execution. Understanding how this behaves will allow you to write *asynchronous code* more deliberately, and will help you with troubleshooting code in the future.

As the *JavaScript* interpreter executes the code, every function that is called is added to *JavaScript’s call stack*. The *call stack* is *a stack—a list-like data structure* where items can only be added to the top, and removed from the top. *Stacks follow the “Last in, first out” or LIFO principle*. If you add two items on the stack, the most recently added item is removed first.

Let’s illustrate with an example using the *call stack.* If *JavaScript* encounters a function *functionA()* being called, it is added to the *call stack.* If that function *functionA()* calls another function *functionB()*, then *functionB()* is added to the top of the *call stack.* As *JavaScript* completes the execution of a function, it is removed from the *call stack.* Therefore, *JavaScript* will execute *functionB()* first, remove it from the stack when complete, and then finish the execution of *functionA()* and remove it from the *call stack.* This is why *inner functions are always executed before their outer functions*.


