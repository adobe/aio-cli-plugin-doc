# Adobe I/O CLI Documentation Website Plugin

Generates a starter documentation website powered by Gatsby.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@adobe/aio-cli-plugin-doc.svg)](https://npmjs.org/package/@adobe/aio-cli-plugin-doc)
[![Downloads/week](https://img.shields.io/npm/dw/@adobe/aio-cli-plugin-doc.svg)](https://npmjs.org/package/@adobe/aio-cli-plugin-doc)
[![Build Status](https://travis-ci.com/adobe/aio-cli-plugin-doc.svg?branch=master)](https://travis-ci.com/adobe/aio-cli-plugin-doc)
[![License](https://img.shields.io/npm/l/@adobe/aio-cli-plugin-doc.svg)](https://github.com/adobe/aio-cli-plugin-doc/blob/master/package.json)
[![Codecov Coverage](https://img.shields.io/codecov/c/github/adobe/aio-cli-plugin-doc/master.svg?style=flat-square)](https://codecov.io/gh/adobe/aio-cli-plugin-doc/)

`doc` commands for the Adobe I/O CLI

<!-- toc -->
* [Adobe I/O CLI Documentation Website Plugin](#adobe-io-cli-documentation-website-plugin)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage
```sh-session
$ aio plugins:install @adobe/aio-cli-plugin-doc
$ # OR
$ aio discover -i
$ aio doc --help
```

# Commands
<!-- commands -->
* [`aio doc:clean [PATH]`](#aio-docclean-path)
* [`aio doc:generate [PATH]`](#aio-docgenerate-path)
* [`aio doc:init [PATH]`](#aio-docinit-path)
* [`aio doc:run [PATH]`](#aio-docrun-path)

## `aio doc:clean [PATH]`

Clean the documentation site

```
USAGE
  $ aio doc:clean [PATH]

ARGUMENTS
  PATH  [default: .] Path to the doc directory
```

_See code: [src/commands/doc/clean.js](https://github.com/adobe/aio-cli-plugin-doc/blob/1.2.1/src/commands/doc/clean.js)_

## `aio doc:generate [PATH]`

Generate the production docs

```
USAGE
  $ aio doc:generate [PATH]

ARGUMENTS
  PATH  [default: .] Path to the doc directory
```

_See code: [src/commands/doc/generate.js](https://github.com/adobe/aio-cli-plugin-doc/blob/1.2.1/src/commands/doc/generate.js)_

## `aio doc:init [PATH]`

Create a new Adobe I/O doc site

```
USAGE
  $ aio doc:init [PATH]

ARGUMENTS
  PATH  [default: .] Path to the doc directory

OPTIONS
  -t, --template=template  the template to install (url to a git repo)
```

_See code: [src/commands/doc/init.js](https://github.com/adobe/aio-cli-plugin-doc/blob/1.2.1/src/commands/doc/init.js)_

## `aio doc:run [PATH]`

Run a development version of the docs locally

```
USAGE
  $ aio doc:run [PATH]

ARGUMENTS
  PATH  [default: .] Path to the doc directory
```

_See code: [src/commands/doc/run.js](https://github.com/adobe/aio-cli-plugin-doc/blob/1.2.1/src/commands/doc/run.js)_
<!-- commandsstop -->

## Contributing

Contributions are welcomed! Read the [Contributing Guide](CONTRIBUTING.md) for more information.

## Licensing

This project is licensed under the Apache V2 License. See [LICENSE](LICENSE) for more information.
