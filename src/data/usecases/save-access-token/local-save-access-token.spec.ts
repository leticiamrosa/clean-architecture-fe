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

  test('', async (): Promise<void> => {

  })
})
