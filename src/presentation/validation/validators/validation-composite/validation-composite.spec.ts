
import { FieldValidationSpy } from '../test/mock-field-validation'
import { ValidationComposite } from './validation-composite'

describe('', () => {
  test('should return error when any validation fails', () => {
    // given
    const fieldValidationSpy = new FieldValidationSpy('any_field')
    const fieldValidationSpy2 = new FieldValidationSpy('any_field')
    fieldValidationSpy.error = new Error('first_error_message')
    fieldValidationSpy2.error = new Error('second_error_message')

    const sut = new ValidationComposite([
      fieldValidationSpy,
      fieldValidationSpy2
    ])

    // when
    const error = sut.validate('any_field', 'any_value')

    // then
    expect(error).toBe('first_error_message')
  })
})
