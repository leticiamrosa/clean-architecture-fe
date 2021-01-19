import { AxiosHttpClient } from './axios-http-client'
import { HttpPostParams } from '@data/protocols/http'
import axios from 'axios'
import faker from 'faker'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})

describe('AxiosHttpClient', () => {
  test('should call axios with correct URL and verb', async () => {
    // given
    const request = mockPostRequest()
    const sut = makeSut()

    // when
    await sut.post(request)

    // then
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url)
  })
})
