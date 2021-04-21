import faker from 'faker'
import { LocalSaveAccessToken } from './local-save-access-token'
import { SetStorageSpy } from '@data/test'

type SutTypes = {
  sut: LocalSaveAccessToken
  setStorageSpy: SetStorageSpy
}

const makeSut = (): SutTypes => {
  const setStorageSpy = new SetStorageSpy()
  const sut = new LocalSaveAccessToken(setStorageSpy)
  return {
    sut,
    setStorageSpy
  }
}

describe('LocalSaveAccessToken', () => {
  test('should call SetStorage with correct value', async (): Promise<void> => {
    // given
    const { sut, setStorageSpy } = makeSut()
    const accessToken = faker.datatype.uuid()

    // when
    await sut.save(accessToken)

    // then
    expect(setStorageSpy.key).toBe('accessToken')
    expect(setStorageSpy.value).toBe(accessToken)
  })
})
