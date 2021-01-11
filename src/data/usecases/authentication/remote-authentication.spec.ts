import { RemoteAuthentication } from './remote-authentication'
import { HttpPostClientSpy } from '../../test/mock-http-client'

describe('RemoteAuthentication', () => {
  test('should call HttpPostClient with correct URL', async () => {
    // given

    const url = 'any_url'
    const httpPostClientSpy = new HttpPostClientSpy()
    const systemUnderTest = new RemoteAuthentication(url, httpPostClientSpy)

    // when
    await systemUnderTest.auth()

    // then
    expect(httpPostClientSpy.url).toBe(url)
  })
})
