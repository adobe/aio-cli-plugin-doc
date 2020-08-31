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

const TheCommand = require('../../../src/commands/doc/init')
const path = require('path')
const yeoman = require('yeoman-environment')
const execa = require('execa')

jest.mock('execa')
jest.mock('yeoman-environment')
jest.mock('fs')

const defaultTemplate = 'https://github.com/AdobeDocs/gatsby-theme-parliament-documentation'

const mockRegister = jest.fn()
const mockRun = jest.fn()
yeoman.createEnv.mockReturnValue({
  register: mockRegister,
  run: mockRun
})

beforeEach(() => {
  mockRegister.mockReset()
  mockRun.mockReset()
  yeoman.createEnv.mockClear()
  execa.mockReset()
})

test('exports', async () => {
  expect(typeof TheCommand).toEqual('function')
})

describe('run', () => {
  const spyChdir = jest.spyOn(process, 'chdir')
  const spyCwd = jest.spyOn(process, 'cwd')
  let fakeCwd
  let command

  beforeEach(() => {
    fakeCwd = 'lifeisgood'
    spyChdir.mockClear()
    spyCwd.mockClear()
    spyChdir.mockImplementation(dir => { fakeCwd = dir })
    spyCwd.mockImplementation(() => fakeCwd)
    execa.mockClear()
    command = new TheCommand([])
  })

  afterAll(() => {
    spyChdir.mockRestore()
    spyCwd.mockRestore()
    execa.mockRestore()
  })

  test('some path', async () => {
    const appFolder = 'some-path'
    command.argv = [appFolder]
    await command.run()

    expect(yeoman.createEnv).toHaveBeenCalled()
    expect(mockRegister).toHaveBeenCalledTimes(1)
    const genDoc = mockRegister.mock.calls[0][1]
    expect(mockRun).toHaveBeenNthCalledWith(1, genDoc, {
      'project-name': appFolder
    })

    expect(spyChdir).toHaveBeenCalledWith(expect.stringContaining(appFolder))
    expect(execa).toHaveBeenCalledWith('gatsby', ['new', expect.any(String), defaultTemplate], command.gatsbyDefaultOptions())
  })

  test('some path, --template flag', async () => {
    const appFolder = 'some-path'
    const newTemplate = 'http://example.com/template'
    command.argv = [appFolder, '--template', newTemplate]
    await command.run()

    expect(yeoman.createEnv).toHaveBeenCalled()
    expect(mockRegister).toHaveBeenCalledTimes(1)
    const genDoc = mockRegister.mock.calls[0][1]
    expect(mockRun).toHaveBeenNthCalledWith(1, genDoc, {
      'project-name': appFolder
    })

    expect(spyChdir).toHaveBeenCalledWith(expect.stringContaining(appFolder))
    expect(execa).toHaveBeenCalledWith('gatsby', ['new', expect.any(String), newTemplate], command.gatsbyDefaultOptions())
  })

  test('no path', async () => {
    await command.run()
    const appFolder = path.resolve('.')

    expect(yeoman.createEnv).toHaveBeenCalled()
    expect(mockRegister).toHaveBeenCalledTimes(1)
    const genDoc = mockRegister.mock.calls[0][1]
    expect(mockRun).toHaveBeenNthCalledWith(1, genDoc, {
      'project-name': path.basename(appFolder)
    })
    expect(spyChdir).not.toHaveBeenCalled()

    expect(execa).toHaveBeenCalledWith('gatsby', ['new', expect.any(String), defaultTemplate], command.gatsbyDefaultOptions())
  })
})
