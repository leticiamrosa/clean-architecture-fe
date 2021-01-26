import { InvalidFieldError } from '@presentation/validation/errors'
import { EmailValidation } from '@presentation/validation/validators/email/email-validation'

describe('EmailValidation', () => {
  test('should return error when the email is invalid', () => {
    // given
    const sut = new EmailValidation('email')

    // when
    const error = sut.validate('')

    // expect
    expect(error).toEqual(new InvalidFieldError())
  })
})
