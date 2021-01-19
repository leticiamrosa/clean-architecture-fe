export class UnexpectedError extends Error {
  constructor () {
    super('something wrong happened, try again please')
    this.name = 'UnexpectedError'
  }
}
