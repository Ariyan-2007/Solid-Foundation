# SOLID-CRUD

_**Pretext**: I've decided to make a short Web API based Backend Application using the SOLID Principles so that I can better understand the principles myself and hopefully it will help other people who finds this to understand the principles themselves. I hope to start the development process by 25.05.24, so if you want to follow you can expect to see updates starting from 25th. Thanks for your patience!_

What I'll be using to implement:

Frontend: N/A <br> Backend: **NodeJS -> Typescript** <br> Database: N/A

P.S. N/A field values are subject to change in the future depending on how far I go with this project.

## SOLID Principle

The SOLID principles are a set of five design principles in object-oriented programming that aim to make software designs more understandable, flexible, maintainable, and extendable.

### Single Responsibility Principle:

A class should have only one reason to change, meaning it should have only one job or responsibility.

### Open/Closed Principle:

Software entities should be open for extension but closed for modification.

### Liskov Substitution Principle:

Objects of a superclass should be replaceable with objects of a subclass without affecting the correctness of the program.

### Interface Segregation Principle:

Clients should not be forced to depend on interfaces they do not use.

### Dependency Inversion Principle:

High-level modules should not depend on low-level modules. Both should depend on abstractions.

## Project Initialization

Make Sure To Have NodeJS Installed Beforehand -> _https://nodejs.org/en/download/package-manager_ <br>

Initial Package Requirements:

- ExpressJS -> `npm install express`
- TypeScript -> `npm install typescript ts-node @types/node @types/express --save-dev`
- Nodemon -> `npm install nodemon`

Run This Command To Configure Type Script: `npx tsc --init`

Now Open your package.json file and under the scripts section add the following lines:

```
"build": "tsc --project ./"
"start": "node dist/index.js",
"dev": "nodemon --exec ts-node src/index.ts"
```

Create a nodemon.json file and open the file and add all these lines: `

```
{
  "watch": ["src"],
  "ext": "ts,js,json",
  "ignore": ["dist"],
  "exec": "ts-node ./src/index.ts"
}
```
_We use nodemon so that we do not need to close the server everytime there's a change made. it will automatically restart the server whenever you save your progress_

################################################################
