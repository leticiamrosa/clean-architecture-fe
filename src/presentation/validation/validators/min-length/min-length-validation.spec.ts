
import { InvalidFieldError } from '@presentation/validation/errors'
import { MinLengthValidation } from './min-length-validation'
import faker from 'faker'

const makeSut = (): MinLengthValidation => new MinLengthValidation(faker.database.column(), 5)

describe('MinLengthValidation', () => {
  test('should return error when value is invalid', () => {
    // given
    const sut = makeSut()

    // when
    const error = sut.validate(faker.random.alphaNumeric(4))

    // then
    expect(error).toEqual(new InvalidFieldError())
  })

  test('should return falsy when the value is valid', () => {
    // given
    const sut = makeSut()
    // when
    const error = sut.validate(faker.random.alphaNumeric(5))

    // then
    expect(error).toBeFalsy()
  })
})
