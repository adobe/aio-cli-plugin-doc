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
const fs = require('fs-extra')
const path = require('path')
const yeoman = require('yeoman-environment')

jest.mock('fs-extra')
jest.mock('yeoman-environment')

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
  fs.ensureDirSync.mockClear()
})

test('exports', async () => {
  expect(typeof TheCommand).toEqual('function')
})

describe('run', () => {
  const spyChdir = jest.spyOn(process, 'chdir')
  const spyCwd = jest.spyOn(process, 'cwd')
  let fakeCwd

  beforeEach(() => {
    fakeCwd = 'lifeisgood'
    spyChdir.mockClear()
    spyCwd.mockClear()
    spyChdir.mockImplementation(dir => { fakeCwd = dir })
    spyCwd.mockImplementation(() => fakeCwd)
  })

  afterAll(() => {
    spyChdir.mockRestore()
    spyCwd.mockRestore()
  })

  test('some path', async () => {
    const appFolder = 'some-path'
    await TheCommand.run([appFolder])

    expect(yeoman.createEnv).toHaveBeenCalled()
    expect(mockRegister).toHaveBeenCalledTimes(1)
    const genDoc = mockRegister.mock.calls[0][1]
    expect(mockRun).toHaveBeenNthCalledWith(1, genDoc, {
      'project-name': appFolder
    })
    expect(fs.ensureDirSync).toHaveBeenCalledWith(expect.stringContaining(appFolder))
    expect(spyChdir).toHaveBeenCalledWith(expect.stringContaining(appFolder))
  })

  test('no path', async () => {
    await TheCommand.run([])
    const appFolder = path.resolve('.')

    expect(yeoman.createEnv).toHaveBeenCalled()
    expect(mockRegister).toHaveBeenCalledTimes(1)
    const genDoc = mockRegister.mock.calls[0][1]
    expect(mockRun).toHaveBeenNthCalledWith(1, genDoc, {
      'project-name': path.basename(appFolder)
    })
    expect(fs.ensureDirSync).not.toHaveBeenCalled()
    expect(spyChdir).not.toHaveBeenCalled()
  })
})
