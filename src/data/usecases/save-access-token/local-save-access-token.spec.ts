import faker from 'faker'
import { LocalSaveAccessToken } from './local-save-access-token'
import { SetStorageSpy } from '@data/test'

describe('LocalSaveAccessToken', () => {
  test('should call SetStorage with correct value', async (): Promise<void> => {
    // given
    const setStorage = new SetStorageSpy()
    const sut = new LocalSaveAccessToken(setStorage)
    const accessToken = faker.datatype.uuid()

    // when
    await sut.save(accessToken)

    // then
    expect(setStorage.key).toBe('accessToken')
    expect(setStorage.value).toBe(accessToken)
  })
})
