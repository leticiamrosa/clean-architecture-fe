
import {
  RequiredFieldValidation,
  EmailValidation,
  MinLengthValidation
} from '@presentation/validation/validators'
import {
  ValidationBuilder as sut
} from './validation-builder'
import faker from 'faker'

describe('ValidationBuilder', () => {
  test('should return RequiredFieldValidation', () => {
    // given
    const field = faker.database.column()
    const expectedErrorField = new RequiredFieldValidation(field)

    // when
    const validations = sut.field(field).required().build()

    // then
    expect(validations).toEqual([expectedErrorField])
  })

  test('should return EmailValidation', () => {
    // given
    const field = faker.database.column()
    const expectedErrorField = new EmailValidation(field)

    // when
    const validations = sut.field(field).email().build()

    // then
    expect(validations).toEqual([expectedErrorField])
  })

  test('should return MinLengthValidation', () => {
    // given
    const field = faker.database.column()
    const minLength = faker.random.number()
    const expectedErrorField = new MinLengthValidation(field, minLength)

    // when
    const validations = sut.field(field).min(minLength).build()

    // then
    expect(validations).toEqual([expectedErrorField])
  })

  test('should return a list of validations', () => {
    // given
    const field = faker.database.column()
    const minLength = faker.random.number()
    const requiredFieldValidation = new RequiredFieldValidation(field)
    const emailValidation = new EmailValidation(field)
    const minValidation = new MinLengthValidation(field, minLength)
    const expectedValidations = [
      requiredFieldValidation,
      minValidation,
      emailValidation
    ]

    // when
    const validations = sut.field(field).required().min(minLength).email().build()

    // then
    expect(validations).toEqual(expectedValidations)
  })
})
