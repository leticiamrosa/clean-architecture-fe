export default interface SaveAccessToken {
  save: (accessToken: string) => Promise<void>
}
