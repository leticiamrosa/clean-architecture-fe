import { InvalidFieldError } from '@presentation/validation/errors'
import { EmailValidation } from '@presentation/validation/validators/email/email-validation'
import faker from 'faker'

const makeSut = (): EmailValidation => new EmailValidation(faker.database.column())

describe('EmailValidation', () => {
  test('should return error when the email is invalid', () => {
    // given
    const sut = makeSut()

    // when
    const error = sut.validate('')

    // expect
    expect(error).toEqual(new InvalidFieldError())
  })

  test('should return falsy when the email is valid', () => {
    // given
    const sut = makeSut()

    // when
    const error = sut.validate(faker.internet.email())

    // expect
    expect(error).toBeFalsy()
  })
})
