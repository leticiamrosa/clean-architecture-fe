
import { FieldValidationSpy } from '../test/mock-field-validation'
import { ValidationComposite } from './validation-composite'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationSpy: FieldValidationSpy[]
}

const makeSut = (): SutTypes => {
  const fieldValidationSpy = [
    new FieldValidationSpy('any_field'),
    new FieldValidationSpy('any_field')
  ]

  const sut = new ValidationComposite(fieldValidationSpy)

  return {
    sut,
    fieldValidationSpy
  }
}

describe('', () => {
  test('should return error when any validation fails', () => {
    // given
    const { sut, fieldValidationSpy } = makeSut()

    fieldValidationSpy[0].error = new Error('first_error_message')
    fieldValidationSpy[1].error = new Error('second_error_message')

    // when
    const error = sut.validate('any_field', 'any_value')

    // then
    expect(error).toBe('first_error_message')
  })
})
