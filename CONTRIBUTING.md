# Contribution Guide for VMS

This guide contains all you need to setup and send a change to the project.

## Assumptions

We assume you have a basic knowledge of web development and `git`. But if you need help setting up, please contact one of the contributors so we can help getting things running.

## Prerequisites and tools

Here is a list of the tools used to develop the project, followed by details on each tool:

- **Required:** [`node.js`](https://nodejs.org/en/download/prebuilt-installer) (Preferably managed by [`volta`](https://docs.volta.sh/guide/getting-started))
- **Required:** [Commit signing configured](https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits), without it, the pull requests **WILL NOT BE ACCEPTED!**
- _Recommended:_ [VS Code](https://code.visualstudio.com/Download)

### `node.js` and `volta`

Most of the tools used are based on `node.js`, so you should have it installed on your machine. It may be installed from an installer, or a version manager for node.

Our recommendation is using `volta` for managing the node versions, it is already configured for the project, so you only need to install `volta` on your machine and it will take care of downloading the correct version of node when you first try installing the dependencies.

### Commit signing

In order to improve the trust and security of the code contributed we require that all commits are signed. A tutorial from GitHub on how to configure commit signing is linked above.

### VS Code

Our editor of choice is Visual Studio Code (VS Code), it is not required for working with the code, but is recommended for sharing code and contributing with others.

## Installing dependencies

Once you have cloned the repository, to install the dependencies run:

```shell
npm install --save-dev
```

This will install all of the needed dependencies.

## Starting the project

To test if the project is okay and start developing, run the command:

```shell
npm run dev
```

the project will start in development mode and watch for code changes.

## Coding standards and guidelines

The code will be formatted before every commit and checked for linting errors before pushing.

If you want to manually do any of those things, you can run the following commands:

```shell
# Run all linters
npm run lint

# Run only the typescript type checker
npm run typecheck

# Run only the js/ts linter
npm run lint:js

# Format the code
npm run format
```

### Typescript is set to strict mode

The objective is to reduce potential errors and force to write defensive code that handles edge cases and weirdness from JavaScript.

### Rely on inference when possible

The reasoning is that manually casting types often obscure bugs that will only be cached at runtime where that can usually be avoided when writing the code.

Here is an example of code showing where types can and can't be inferred:

```typescript
// The parameter cannot be inferred, but the return type can.
// So no need to type the return type
function test(param: string) {
	return `The parameter is: ${param}`;
}

// When initializing variables like arrays, we need to pass the type.
// This is because without telling typescript it will infer the wrong type.
const arrayOfNumbers: number[] = [];

// We also want to type objects as it will lead to better suggestions for the properties.
const objectWithDefinedProperties: TypeOrInterfaceWithProperties = {
	// ...
};
```

### Use meaningful names

Code is meant to be read as much as it is to be written and we are writing code for others. These "others" include yourself in the future.

So to make everyone life easier, when naming things, use names that are descriptive and meaningful for the thing you are describing. Here are some questions to ask:

- Does the name make sense in this context?
- Is it too short?
- Is it too long?
- Is this abbreviation something common or is it a niche use?
- How generic is this name?
- Can this name be read as part of a sentence?

Some _suggestions_ to improve readability are:

- Functions and methods benefit from being named like verbs because they usually _act_ upon the parameters and execute an _action_. E.g. `initializeDatabase()`, `BlogPost.loadRelatedPosts()`, or `downloadFile()`.
- Variables, constants, and parameters usually represent _things_ so it makes sense to name them like so. E.g.: `userProfile`, `blogPosts`, or `databaseConfiguration`.
- Booleans are more readable if we add a prefix like `is`, `should`, or `has` before the name. E.g.: `human` vs `isHuman`; `driversLicense` vs `hasDriversLicence`.
- Numbers representing a _unit of measurement_ should include the unit in the variable name to remove ambiguity of the unit in question. E.g.: `timeout` vs `timeoutInSeconds`.
- Flags should be timestamps, more often than not when we search for some information we not only want to know if the data meets a condition but also _when_ that condition was met. E.g.: `verifiedEmail` benefits from having a timestamp for filtering everyone who verified their emails before a certain date.
- List of things should be pluralized to convey it is a _list_ and not a single thing.

### Avoid spaghetti code

When code is too indirect, that means, you have to jump around multiple functions to find the actual code that does something it adds a lot of mental overload for the person reading the code, avoid that.

Most of the time if the code is used only in one place you can simplify this code and remove the extra function.

### Avoid premature DRY-ness

As much as we like to keep our code tidy and DRY, sometimes mushing things together only gets in the way. So think if it makes sense to actually keep things separate or wait a little bit before combining things.

### Code structure

Formatting is configured to not get in the way and yet lead to legible code. It takes care of things like spaces between items on an array or making consistent formatting of multiline lists. but you still retain control over the code structure.

You have autonomy to write the code as you like, but think about making it readable by others.
Here are some _suggestions_ to help in formatting the code:

- Use blank lines to split "chunks" of code that make sense together, this will make easier to read where a block of code starts and where it ends.
- If a line is getting too long, think about breaking it into intermediate steps.
- If you have a lot of parameters in a function, move them to a "configuration" object.
- If you are doing multiple operations over a single piece of data, think if it makes sense to restructure the data or to break the operations in smaller steps.

### Avoid clever tricks

Like English where using _hermetic_ words (pun intended) makes us sound fancier, if our code has clever tricks without any reason or explanation, it makes hard for everyone to understand.

### Comments and self-documenting code

Comments exist and are useful to help understand the code, it is not a hard rule to either _"comment everything"_ or _"not comment anything"_. So add them when it helps to understand the code.

As general _suggestions_:

- The code should be readable by itself, that means a person reading it should be able to follow the code without much problem.
- When you are writing a piece of code that is complex, does something obscure, or does a very specific thing, write a comment.
- When adding context to a function or variable will help, add a comment.

Typescript and VS Code provide good tooling for JSDoc comments, here is an example of how to document things:

```typescript
/**
 * Fetched the user avatar from [Gravatar](https://gravatar.com/).
 *
 * The user id is used to get the email first, as gravatar images are fetched using the email.
 *
 * @param userId The user UUID in the database.
 */
function fetchUserAvatar(userId: string) {
	// ...
}

/**
 * The default timeout used by all fetch requests.
 */
const DEFAULT_TIMEOUT_IN_SECONDS = 5;
```

### Favoring function declaration over function expressions

In general, we want to prefer function declarations for a couple reasons:

- They are [hoisted](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting), so they avoid errors coming from the [Temporal Dead Zone](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#temporal_dead_zone_tdz)
- Arrow functions, in particular, can create issues with [the binding of `this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#cannot_be_used_as_methods).

As a rule of thumb:

- If it has a name, use a regular function declaration.
- If it is used as a "one off" anonymous function (e.g.: as an argument for `Array.map`), use an arrow function expression.

### Prefer throwing errors, and handle them only at the top-most level

As a general idea, we want to cascade and propagate errors to the outermost layer. That way, if something goes wrong, the code breaks and don't execute more than expected and the error propagates to a place that can handle it properly.

In practical terms, it means request handlers will be the place where error handling happens generally, and then other pieces of code should throw errors.

Note that subclassing of errors to add more metadata, it is also an interesting way to help the handling of specific types of errors.

Here is an example of subclassing:

```typescript
class DataValidationError extends Error {
	statusCode: number;

	constructor(message: string, statusCode: number) {
		super(message);

		this.statusCode = statusCode;
	}
}

function dataValidation() {
	throw new DataValidationError('Invalid data', 400);
}

function requestHandler(context: HonoContext) {
	try {
		dataValidation();
	} catch (err) {
		// This is a validation error, so we have the status code available
		if (err instanceof DataValidationError) {
			return context.json({ error: err.message }, err.statusCode);
		}

		// This is a regular error, so it may be comming from somewhere else.
		// Here we treat it like a server error.
		return context.json({ error: err.message }, 500);
	}
}
```

An exception to this is when we want to silently ignore errors, or we want to handle things differently even if an error occurs, like adding a default return. On that case it is okay to use `try..catch` in other places.

### Use relative imports

Imports on the web only recognize URLs. "Bare imports" is a thing that started with node and then it evolved into import maps.

URL imports basically come down to those 3 ways of referencing an import:

- A relative import that start with `./` or `../`;
- An absolute import that starts with `/`, and points to the base domain;
- An absolute URL to a different domain, that starts with `https://`.

Think about it as the path to an image or CSS file, it is the same things.

When we do it for the project, it keeps consistency and compatibility with the web and reduces the amount of "translation" needed to reference a file.

The drawbacks are that if we move a file around it changes everything that depends on that file, and we have to update all of the imports; and that reading a file import can be "wonky" like `../../some/folder/file.ts`.

The good part is that it improves discoverability of dependencies because everything is made _more explicit_.

So, what about [import maps](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap)? They are a neat tool to help make bare imports work on the web. But they add a layer of complexity and indirection. There is no easy way to tell "where does this come from?"

As a general guideline:

- All code that is ours should use relative imports to make it easier to reason about.
- We should not use absolute imports (i.e. the ones starting with `/`) because transforms, bundling and all other things may break the paths.
- All _external dependencies_ should use bare imports. For those we want to keep the node style.

This helps create consistency and differentiation of internal vs external code and keep our dependencies transparent to us, it doesn't matter much where they come from in the end.

### Separation of concerns and "super functions"

To make the code more legible and easier to understand, we should base ourselves on the [UNIX philosophy](https://en.wikipedia.org/wiki/Unix_philosophy) and write functions that only handle _one thing_.

Two thing to understand here are:

- "One thing" can also be orchestration of other functions
- Related logic should be grouped together

That means that code should always be contained into a "single unit" responsible for handling a flow, as an orchestrator, or part of that flow.

One example here are request handlers, we should split the code in three parts:

- The request handler itself, responsible for dealing with checks for headers, content type and body parsing.
- A data validation function that will validate all the cases and formats for the data, including it being null, missing properties, etc.
- A data processing handler that receives valid data as an input and outputs the result of saving that data to a database, or executing some logic with that data.

Having this organization, help to write more testable function without resorting to complex hacks like mocks; and to follow the code more easily, as the code should read as series of steps that can be expanded upon if needed, but you get the general idea from just scanning the code.

One thing to keep in mind here is to be contentious of how much the code is broken into small pieces, we want to strike a balance between writing a "super function" with everything inside and writing many small functions that makes reading the code feel like hopping around in circles.

## Branches and forks

When you are working in a feature it is better to work on a separate branch, that makes the code contained and easier to test by others. If you have access to directly create branches from the repository, do it, if you don't create a fork and then create a new branch.

We don't enforce a naming convention for branches, but we encourage it to be meaningful names that quickly describe what you are working on. It is okay to use prefixes like `fix/`, `feat/`, or `chore/` to represent a bug fix, a feature, or some housekeeping task, respectively.

## Committing

We don't enforce a committing standard, but below are some guidelines for commit messages:

- We don't enforce it but highly suggest using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary)
- Be descriptive, a commit message tells what happened to that code.
- Commit messages should aim to "fit in a Tweet". That adds conciseness.
- The first line of the commit is the summary, use it!
- If more context is needed for the changes, write a summary, leave a blank line, then add a longer message as needed.
- Commit often so you don't have a lot to commit about.
- The changed files are part of the commit, so no need to be redundant in the message.

## Creating a Pull Request

When you are ready to submit your changes please create a pull request targeting the main repository. The maintainers will be notified and review your Pull Request, please visit it frequently for comments and request for changes.

Here is a good tutorial to check if you need help with contribution tasks: https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github
