import { RemoteAuthentication } from './remote-authentication'
import { HttpPostClientSpy } from '../../test/mock-http-client'

type SystemUnderTestTypes = {
  systemUnderTest: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy
};

const makeSystemUnderTest = (url: string = 'any_url'): SystemUnderTestTypes => {
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
    const url = 'other_url'
    const { systemUnderTest, httpPostClientSpy } = makeSystemUnderTest(url)

    // when
    await systemUnderTest.auth()

    // then
    expect(httpPostClientSpy.url).toBe(url)
  })
})
