import { SaveAccessToken } from '@domain/usecases'
import { LocalSaveAccessToken } from '@data/usecases/save-access-token/local-save-access-token'
import { makeLocalStorageAdapter } from '@main/factories/cache'

export const makeLocalSaveAccessToken = (): SaveAccessToken => {
  const createLocalStorageAdapter = makeLocalStorageAdapter()

  return new LocalSaveAccessToken(createLocalStorageAdapter)
}
