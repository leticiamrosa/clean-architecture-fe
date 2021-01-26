import { RequiredFieldValidation } from '@presentation/validation/required-field/required-field-validation'
import { RequiredFieldError } from '@presentation/validation/errors'
import faker from 'faker'

describe('RequiredFieldValidation', () => {
  test('should return error when the field is empty', () => {
    // given
    const sut = new RequiredFieldValidation('email')
    const expectedError = new RequiredFieldError()

    // when
    const error = sut.validate('')

    // then
    expect(error).toEqual(expectedError)
  })

  test('should return falsy when the field is not empty', () => {
    // given
    const sut = new RequiredFieldValidation('email')
    const value = faker.random.word()

    // when
    const error = sut.validate(value)

    // then
    expect(error).toBeFalsy()
  })
})
