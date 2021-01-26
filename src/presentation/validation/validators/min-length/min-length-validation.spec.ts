
import { InvalidFieldError } from '@presentation/validation/errors'
import { MinLengthValidation } from './min-length-validation'

describe('MinLengthValidation', () => {
  test('should return error when value is invalid', () => {
    // given
    const sut = new MinLengthValidation('field', 5)

    // when
    const error = sut.validate('123')

    // then
    expect(error).toEqual(new InvalidFieldError())
  })
})
