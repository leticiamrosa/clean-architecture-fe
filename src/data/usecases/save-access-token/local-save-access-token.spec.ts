import faker from 'faker'
import { LocalSaveAccessToken } from './local-save-access-token'
import { SetStorageMock } from '@data/test'

type SutTypes = {
  sut: LocalSaveAccessToken
  setStorageMock: SetStorageMock
}

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock()
  const sut = new LocalSaveAccessToken(setStorageMock)
  return {
    sut,
    setStorageMock
  }
}

describe('LocalSaveAccessToken', () => {
  test('should call SetStorage with correct value', async (): Promise<void> => {
    // given
    const { sut, setStorageMock } = makeSut()
    const accessToken = faker.datatype.uuid()

    // when
    await sut.save(accessToken)

    // then
    expect(setStorageMock.key).toBe('accessToken')
    expect(setStorageMock.value).toBe(accessToken)
  })

  test('should throw error when the SetStorage return a reject', async (): Promise<void> => {
    // given
    const { sut, setStorageMock } = makeSut()
    jest.spyOn(setStorageMock, 'set').mockRejectedValueOnce(new Error())
    const accessToken = faker.datatype.uuid()

    // when
    const promise = sut.save(accessToken)

    // then
    await expect(promise).rejects.toThrow(new Error())
  })
})
