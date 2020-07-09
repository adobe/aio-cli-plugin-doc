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

const { flags } = require('@oclif/command')
const BaseCommand = require('../../base_command')
const aioLogger = require('@adobe/aio-lib-core-logging')('@adobe/aio-cli-plugin-doc', { provider: 'debug' })
const path = require('path')
const yeoman = require('yeoman-environment')

class InitCommand extends BaseCommand {
  async run () {
    const { args, flags } = this.parse(InitCommand)
    const destDir = path.resolve(args.path)
    const theme = flags.theme || 'https://github.com/codebushi/gatsby-theme-document-example'

    aioLogger.debug(`using theme: ${theme}`)
    aioLogger.debug('creating new docs with init command.')

    this.log(`Using theme: ${theme}`)
    await this.gatsby(['new', destDir, theme])

    if (args.path !== '.') {
      process.chdir(destDir)
    }

    const env = yeoman.createEnv()

    // call code generator
    env.register(require.resolve('../../generator'), 'gen-docs')
    const res = await env.run('gen-docs', {
      'project-name': path.basename(destDir)
    })

    // finalize configuration data
    this.log('✔ Doc initialization finished!')
    return res
  }
}

InitCommand.description = `Create a new Adobe I/O doc site
`
InitCommand.flags = {
  theme: flags.string({
    char: 't',
    description: 'the theme to install (url to a git repo)',
    multiple: false // allow setting this flag multiple times
  })
}

InitCommand.args = [
  {
    name: 'path',
    description: 'Path to the doc directory',
    default: '.'
  }
]

module.exports = InitCommand
