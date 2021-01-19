import { AxiosHttpClient } from './axios-http-client'
import { mockPostRequest } from '@data/test'
import { mockAxios } from '@infra/test'
import axios from 'axios'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()

  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClient', () => {
  test('should call axios with correct values', async () => {
    // given
    const request = mockPostRequest()
    const { sut, mockedAxios } = makeSut()

    // when
    await sut.post(request)

    // then
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test('should return the correct statusCode and body', () => {
    // given
    const request = mockPostRequest()
    const { sut, mockedAxios } = makeSut()

    // when
    const promise = sut.post(request)

    // then
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
  })
})
