export class InvalidCredentialsError extends Error {
  constructor () {
    super('Creddenciais inválidas')
    this.name = 'InvalidCredentialsError'
  }
}
