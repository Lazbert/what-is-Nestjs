# what-is-Nestjs
1. [Getting Started](#getting-started )
2. [Basic Concepts](#basic-concepts)
<br/>a. [Modules](#modules)
<br/>b. [Controllers](#controllers)

> Nestjs is a node.js backend framework built on top of Express with its strength in architecture.

Unlike **Express.js**, its lightweight counterpart which is unopinionated on how stuff should be structured, **Nestjs** aims to be a *platform-agnostic* framework for building a *testable, scalable, and maintainable* application through modularity.

---
## Getting Started
Run `npm i -g @nestjs/cli`, then create new project with `nest new [project_name]`

The initialization (termed *boostrap*) file can be found at `main.ts`, providing a HTTP listener at the specified port  upon running `npm run start[:dev]` in terminal.

![alt text](README_pics/main.png)

---
## Basic Concepts
### Modules
> A module is any class annotated with the `@Module()` decorator which Nest uses to organize the application structure.
<img src="https://docs.nestjs.com/assets/Modules_1.png">
*\* An application graph*

Each applciation has a root module contained in `app.module.ts` which encapsulates all modularized features. This composition is reminiscent of the one in React or Angular.

The module decorator accepts an object with the following keys (explained later on):
![alt text](README_pics/module.png)

You can handily generate a module and import it in `app.module.ts` using the command `nest g module [module]`. Module files by themselves do not contain the actual functionality. Instead, they are **containers** serving code organization and reusability.

### Controllers
> Controllers are endpoints annotated by the decorator `@Controllers()` responsible for handling incoming requests & responses.

