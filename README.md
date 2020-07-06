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
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage
```sh-session
$ aio plugins:install -g @adobe/aio-cli-plugin-doc
$ # OR
$ aio discover -i
$ aio doc --help
```

# Commands
<!-- commands -->
* [`aio doc:generate [PATH]`](#aio-docgenerate-path)
* [`aio doc:init [PATH]`](#aio-docinit-path)
* [`aio doc:run [PATH]`](#aio-docrun-path)

## `aio doc:generate [PATH]`

Generate the Adobe docs

```
USAGE
  $ aio doc:generate [PATH]

ARGUMENTS
  PATH  [default: .] Path to the doc directory
```

## `aio doc:init [PATH]`

Create a new Adobe I/O doc folder

```
USAGE
  $ aio doc:init [PATH]

ARGUMENTS
  PATH  [default: .] Path to the doc directory
```

## `aio doc:run [PATH]`

Run the Adobe docs locally

```
USAGE
  $ aio doc:run [PATH]

ARGUMENTS
  PATH  [default: .] Path to the doc directory
```
<!-- commandsstop -->

## Contributing

Contributions are welcomed! Read the [Contributing Guide](CONTRIBUTING.md) for more information.

## Licensing

This project is licensed under the Apache V2 License. See [LICENSE](LICENSE) for more information.
