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
const execa = require('execa')

jest.mock('execa')
jest.mock('fs')

test('exports', async () => {
  expect(typeof TheCommand).toEqual('function')
})

describe('generate', () => {
  const spyChdir = jest.spyOn(process, 'chdir')
  const spyCwd = jest.spyOn(process, 'cwd')
  let fakeCwd
  let command

  beforeEach(() => {
    fakeCwd = 'my-cwd'
    spyChdir.mockClear()
    spyChdir.mockImplementation(dir => { fakeCwd = dir })
    spyCwd.mockClear()
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

    expect(execa).toHaveBeenCalledWith('gatsby', ['develop', '--open'], command.gatsbyDefaultOptions())
    expect(spyChdir).toHaveBeenCalledWith(expect.stringContaining(appFolder))
  })

  test('no args', async () => {
    await command.run()

    expect(execa).toHaveBeenCalledWith('gatsby', ['develop', '--open'], command.gatsbyDefaultOptions())
    expect(spyChdir).not.toHaveBeenCalled()
  })
})
