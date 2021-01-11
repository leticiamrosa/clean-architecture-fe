import { RemoteAuthentication } from './remote-authentication'
import { HttpPostClient } from 'data/protocols/http/http-post-client'

describe('RemoteAuthentication', () => {
  test('should call HttpPostClient with correct URL', async () => {
    // given
    class HttpPostClientSpy implements HttpPostClient {
      url?: string

      async post (url: string): Promise<void> {
        this.url = url
        return Promise.resolve()
      }
    };

    const url = 'any_url'
    const httpPostClientSpy = new HttpPostClientSpy()
    const systemUnderTest = new RemoteAuthentication(url, httpPostClientSpy)

    // when
    await systemUnderTest.auth()

    // then
    expect(httpPostClientSpy.url).toBe(url)
  })
})
