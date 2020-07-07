/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const path = require('path')
const Generator = require('yeoman-generator')

/*
      'initializing',
      'prompting',
      'configuring',
      'default',
      'writing',
      'conflicts',
      'install',
      'end'
      */

class DocGenerator extends Generator {
  constructor (args, opts) {
    super(args, opts)

    // props are passed to templates
    this.props = {}
    this.props.projectName = this.options && this.options['project-name']
  }

  async prompting () {
    this.log(`Generating docs in: ${this.destinationPath()}`)
    // TODO: do we want to prompt for sub-components? Right now we include everything
  }

  writing () {
    this.sourceRoot(path.join(__dirname, './templates/'))

    // TODO: we don't have anything to copy over yet.

    // copy everything that does not start with an _
    // this.fs.copyTpl(
    //     `${this.templatePath()}/**/!(_)*/`,
    //     this.destinationPath(),
    //     this.props
    // )

    // npm pack will not include .gitignore template files so we need to rename it
    // see https://github.com/npm/npm/issues/3763
    // this.fs.copyTpl(
    //   this.templatePath('_dot.gitignore'),
    //   this.destinationPath('.gitignore'),
    //   this.props
    // )

    // let actions and ui generator create subfolders + manifest
  }

  async install () {
    // npm install only
    return this.installDependencies({ bower: false, skipMessage: true })
  }
}

module.exports = DocGenerator
