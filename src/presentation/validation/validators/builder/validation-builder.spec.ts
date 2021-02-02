
import {
  RequiredFieldValidation,
  EmailValidation,
  MinLengthValidation
} from '@presentation/validation/validators'
import {
  ValidationBuilder as sut
} from './validation-builder'

describe('ValidationBuilder', () => {
  test('should return RequiredFieldValidation', () => {
    // given
    const expectedErrorField = new RequiredFieldValidation('any_field')

    // when
    const validations = sut.field('any_field').required().build()

    // then
    expect(validations).toEqual([expectedErrorField])
  })

  test('should return EmailValidation', () => {
    // given
    const expectedErrorField = new EmailValidation('any_field')

    // when
    const validations = sut.field('any_field').email().build()

    // then
    expect(validations).toEqual([expectedErrorField])
  })

  test('should return MinLengthValidation', () => {
    // given
    const expectedErrorField = new MinLengthValidation('any_field', 5)

    // when
    const validations = sut.field('any_field').min(5).build()

    // then
    expect(validations).toEqual([expectedErrorField])
  })
})
