/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const { Command } = require('@oclif/command')
const path = require('path')
const fs = require('fs-extra')
const execa = require('execa')

class RunCommand extends Command {
  async run () {
    const { args } = this.parse(RunCommand)
    const destDir = path.resolve(args.path)

    if (args.path !== '.') {
      fs.ensureDirSync(destDir)
      process.chdir(destDir)
    }

    const publicFolderExists = await fs.pathExists(path.join(destDir, 'public'))
    if (!publicFolderExists) {
      this.error('The docs have not been generated yet. Run `aio doc generate`.')
    }

    return execa('npx', ['gatsby', 'develop', '--open'], {
      stdio: 'inherit',
      env: {
        FORCE_COLOR: true
      }
    })
  }
}

RunCommand.description = `Run the Adobe docs locally
`

RunCommand.args = [
  {
    name: 'path',
    description: 'Path to the doc directory',
    default: '.'
  }
]

module.exports = RunCommand
