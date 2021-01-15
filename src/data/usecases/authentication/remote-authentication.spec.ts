import faker from 'faker'
import { RemoteAuthentication } from '@data/usecases/authentication/remote-authentication'
import { HttpPostClientSpy } from '@data/test/mock-http-client'
import { mockAuthentication } from '@domain/test/mock-authentication'

type SystemUnderTestTypes = {
  systemUnderTest: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy
};

const makeSystemUnderTest = (url: string = faker.internet.url()): SystemUnderTestTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const systemUnderTest = new RemoteAuthentication(url, httpPostClientSpy)

  return {
    systemUnderTest,
    httpPostClientSpy
  }
}

describe('RemoteAuthentication', () => {
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
