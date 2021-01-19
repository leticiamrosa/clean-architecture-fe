import faker from 'faker'
import { RemoteAuthentication } from '@data/usecases/authentication/remote-authentication'
import { HttpPostClientSpy } from '@data/test/mock-http-client'
import { mockAuthentication } from '@domain/test/mock-authentication'
import { InvalidCredentialsError } from '@domain/errors/invalid-credentials-error'
import { HttpStatusCode } from '@data/protocols/http/http-response'
import { UnexpectedError } from '@domain/errors/unexpected-error'
import { AuthenticationParams } from '@domain/usecases/authentication'
import { AccountModel } from '@domain/models/account-model'

type SystemUnderTestTypes = {
  systemUnderTest: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>
};

const makeSystemUnderTest = (url: string = faker.internet.url()): SystemUnderTestTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AuthenticationParams, AccountModel>()
  const systemUnderTest = new RemoteAuthentication(url, httpPostClientSpy)

  return {
    systemUnderTest,
    httpPostClientSpy
  }
}

describe('RemoteAuthentication', () => {
  describe('HttpPostClient', () => {
    test('should call HttpPostClient with correct URL', async () => {
      // given
      const url = faker.internet.url()
      const { systemUnderTest, httpPostClientSpy } = makeSystemUnderTest(url)

      // when
      await systemUnderTest.auth(mockAuthentication())

      // then
      expect(httpPostClientSpy.url).toBe(url)
    })

    test('should call HttpPostClient with correct body', async () => {
      // given
      const { systemUnderTest, httpPostClientSpy } = makeSystemUnderTest()
      const authenticationParamsMock = mockAuthentication()

      // when
      await systemUnderTest.auth(authenticationParamsMock)

      // then
      expect(httpPostClientSpy.body).toEqual(authenticationParamsMock)
    })
  })

  describe('HttpPostClient returns error', () => {
    test('should throw UnexpectedError if HttpPostClient returns 400', async () => {
      // given
      const { systemUnderTest, httpPostClientSpy } = makeSystemUnderTest()
      httpPostClientSpy.response = {
        statusCode: HttpStatusCode.badRequest
      }

      // when
      const result = systemUnderTest.auth(mockAuthentication())

      // then
      await expect(result).rejects.toThrow(new UnexpectedError())
    })

    test('should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
      // given
      const { systemUnderTest, httpPostClientSpy } = makeSystemUnderTest()
      httpPostClientSpy.response = {
        statusCode: HttpStatusCode.unathorized
      }

      // when
      const result = systemUnderTest.auth(mockAuthentication())

      // then
      await expect(result).rejects.toThrow(new InvalidCredentialsError())
    })

    test('should throw UnexpectedError if HttpPostClient returns 404', async () => {
      // given
      const { systemUnderTest, httpPostClientSpy } = makeSystemUnderTest()
      httpPostClientSpy.response = {
        statusCode: HttpStatusCode.notFound
      }

      // when
      const result = systemUnderTest.auth(mockAuthentication())

      // then
      await expect(result).rejects.toThrow(new UnexpectedError())
    })

    test('should throw UnexpectedError if HttpPostClient returns 500', async () => {
      // given
      const { systemUnderTest, httpPostClientSpy } = makeSystemUnderTest()
      httpPostClientSpy.response = {
        statusCode: HttpStatusCode.serverError
      }

      // when
      const result = systemUnderTest.auth(mockAuthentication())

      // then
      await expect(result).rejects.toThrow(new UnexpectedError())
    })
  })
})
