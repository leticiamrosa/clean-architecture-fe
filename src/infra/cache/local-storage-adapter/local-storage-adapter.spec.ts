import faker from 'faker'
import { cleanup } from '@testing-library/react'
import { LocalStorageAdapter } from './local-storage-adapter'

import 'jest-localstorage-mock'

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter()

describe('LocalStorageAdapter', (): void => {
  afterEach(cleanup)

  beforeEach(() => {
    localStorage.clear()
  })

  test('should call localStorage with correct values', async (): Promise<void> => {
    // given
    const sut = makeSut()
    const key = faker.database.column()
    const value = faker.random.word()

    // when
    await sut.set(key, value)

    // then
    expect(localStorage.setItem).toBeCalledWith(key, value)
  })
})
