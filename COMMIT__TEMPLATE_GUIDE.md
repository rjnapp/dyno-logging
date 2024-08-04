# Commit Message Template

Please use the following template for your commit messages to ensure they comply with the commitlint rules.

## Commit Message Structure

A commit message consists of a header, body, and footer. The header is mandatory and must follow the format outlined below. The body and footer are optional but recommended for providing additional context and references.

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

## Header

### Type

The type must be one of the following:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **refactor**: Code refactoring without adding features or fixing bugs
- **test**: Adding or updating tests
- **chore**: Routine tasks (e.g., updating build tasks, package manager configs)
- **security**: Security improvements or fixes
- **revert**: Reverting a previous commit
- **ci**: Continuous integration changes
- **perf**: Performance improvements
- **build**: Changes that affect the build system or external dependencies

### Scope

The scope is mandatory and should be one of the following:

- **config**: Configuration files
- **docs**: Documentation
- **test-cases**: Test cases
- **dyno-logging**: Dyno logging feature
- **security**: Security-related changes
- **performance**: Performance improvements
- **release-workflow**: Release workflow changes
- **build-workflow**: Build workflow changes
- **formatter**: Formatter changes
- **transport**: Transport layer changes

### Subject

The subject should be a brief summary of the change. It must follow these rules:

- Start with a capital letter
- Use sentence-case
- Do not exceed 100 characters

## Body

The body is optional but recommended for providing additional context about the commit. Use the body to explain what changes were made and why. Wrap the body text at 72 characters.

## Footer

The footer is optional and should contain any references or metadata, such as issue numbers or breaking changes.

## Examples

### Example 1

```
feat(dyno-logging): Add support for multiple transport layers

This commit adds support for multiple transport layers, allowing users to configure different transports for different environments.

BREAKING CHANGE: The transport configuration has changed to support multiple transport layers.
```

### Example 2

```
fix(security): Fix vulnerability in authentication module

This commit addresses a vulnerability in the authentication module that could allow unauthorized access to user accounts.

Closes #123
```

### Example 3

```
docs(test-cases): Update test case documentation for new API endpoints

Added detailed descriptions and examples for the new API endpoints introduced in version 2.0.
```

Please adhere to this template to maintain a consistent commit history and improve collaboration within the project.
