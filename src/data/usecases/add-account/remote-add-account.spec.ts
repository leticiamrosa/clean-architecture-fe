import { RemoteAddAccount } from './remote-add-acount'
import { HttpPostClientSpy } from '@data/test'
import { HttpStatusCode } from '@data/protocols/http'
import { AddAccountParams } from '@domain/usecases'
import { AccountModel } from '@domain/models'
import { mockAddAccountParams } from '@domain/test'
import { EmailInUseError } from '@domain/errors'

import faker from 'faker'

// SutTpes means SystemUnderTestTypes
type SutTypes = {
  sut: RemoteAddAccount
  httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AddAccountParams, AccountModel>()
  const sut = new RemoteAddAccount(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAddAccount', (): void => {
  test('should call HttpPostClient with correct URL', async () => {
    // given
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)

    // when
    await sut.add(mockAddAccountParams())

    // then
    expect(httpPostClientSpy.url).toBe(url)
  })

  test('should call HttpPostClient with correct body', async () => {
    // given
    const { sut, httpPostClientSpy } = makeSut()
    const addAccountParams = mockAddAccountParams()

    // when
    await sut.add(addAccountParams)

    // then
    expect(httpPostClientSpy.body).toEqual(addAccountParams)
  })

  test('should throw EmailInUseError if HttpPostClient returns 403', async () => {
  // given
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }

    // when
    const promise = sut.add(mockAddAccountParams())

    // then
    await expect(promise).rejects.toThrow(new EmailInUseError())
  })
})
