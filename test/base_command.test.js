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

const TheCommand = require('../src/base_command')
const path = require('path')

jest.mock('execa')

test('exports', async () => {
  expect(typeof TheCommand).toEqual('function')
  const command = new TheCommand([])
  expect(typeof command.gatsby).toEqual('function')
  expect(typeof command.gatsbyDefaultOptions).toEqual('function')
})

describe('base command', () => {
  let command

  beforeEach(() => {
    command = new TheCommand([])
  })

  test('run', async () => {
    await expect(command.run()).rejects.toThrowError(new Error('abstract method is not implemented'))
  })

  test('gatsby', async () => {
    await expect(command.gatsby()).resolves.toEqual(undefined)
  })

  test('gatsbyDefaultOptions', () => {
    expect(command.gatsbyDefaultOptions()).toEqual({
      preferLocal: true,
      localDir: path.resolve(path.join(__dirname, '..')), // root folder
      stdio: 'inherit',
      env: {
        FORCE_COLOR: true
      }
    })
  })
})
