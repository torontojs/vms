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

For more information, please refer to the [Coding Standards docs](./docs/Coding%20Standard/).

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
