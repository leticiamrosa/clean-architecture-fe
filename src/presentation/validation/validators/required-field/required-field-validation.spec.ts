import { RequiredFieldValidation } from '@presentation/validation/validators/required-field/required-field-validation'
import { RequiredFieldError } from '@presentation/validation/errors'
import faker from 'faker'

const makeSut = (): RequiredFieldValidation => {
  const value = faker.database.column()
  return new RequiredFieldValidation(value)
}

describe('RequiredFieldValidation', () => {
  test('should return error when the field is empty', () => {
    // given
    const sut = makeSut()
    const expectedError = new RequiredFieldError()

    // when
    const error = sut.validate('')

    // then
    expect(error).toEqual(expectedError)
  })

  test('should return falsy when the field is not empty', () => {
    // given
    const sut = makeSut()
    const value = faker.random.word()

    // when
    const error = sut.validate(value)

    // then
    expect(error).toBeFalsy()
  })
})
