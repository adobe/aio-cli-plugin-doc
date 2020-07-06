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

const TheCommand = require('../../../src/commands/doc/run')
const fs = require('fs-extra')
const execa = require('execa')

jest.mock('fs-extra')
jest.mock('execa')

test('exports', async () => {
  expect(typeof TheCommand).toEqual('function')
})

describe('generate', () => {
  const spyChdir = jest.spyOn(process, 'chdir')
  const spyCwd = jest.spyOn(process, 'cwd')
  let fakeCwd

  beforeEach(() => {
    fakeCwd = 'my-cwd'
    fs.ensureDirSync.mockClear()
    fs.pathExists.mockClear()
    fs.pathExists.mockImplementation(_ => true)
    spyChdir.mockClear()
    spyChdir.mockImplementation(dir => { fakeCwd = dir })
    spyCwd.mockClear()
    spyCwd.mockImplementation(() => fakeCwd)
  })

  afterAll(() => {
    spyChdir.mockRestore()
    spyCwd.mockRestore()
    fs.ensureDirSync.mockRestore()
    fs.pathExists.mockRestore()
  })

  test('some path', async () => {
    const appFolder = 'some-path'
    await TheCommand.run([appFolder])

    const options = {
      env: { FORCE_COLOR: true },
      stdio: 'inherit'
    }

    expect(execa).toHaveBeenCalledWith('npx', ['gatsby', 'develop', '--open'], options)
    expect(fs.ensureDirSync).toHaveBeenCalledWith(expect.stringContaining(appFolder))
    expect(spyChdir).toHaveBeenCalledWith(expect.stringContaining(appFolder))
  })

  test('no args', async () => {
    await TheCommand.run([])

    const options = {
      env: { FORCE_COLOR: true },
      stdio: 'inherit'
    }

    expect(execa).toHaveBeenCalledWith('npx', ['gatsby', 'develop', '--open'], options)
    expect(fs.ensureDirSync).not.toHaveBeenCalled()
    expect(spyChdir).not.toHaveBeenCalled()
  })

  test('docs not generated yet', async () => {
    fs.pathExists.mockImplementation(_ => false)
    await expect(TheCommand.run([])).rejects.toThrow('The docs have not been generated yet. Run `aio doc generate`.')
  })
})
