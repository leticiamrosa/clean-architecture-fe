import { AxiosHttpClient } from './axios-http-client'
import axios from 'axios'
import faker from 'faker'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

describe('AxiosHttpClient', () => {
  test('should call axios with correct URL and verb', async () => {
    // given
    const url = faker.internet.url()
    const sut = makeSut()

    // when
    await sut.post({ url })

    // then
    expect(mockedAxios.post).toHaveBeenCalledWith(url)
  })
})
