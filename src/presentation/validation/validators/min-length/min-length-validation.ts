import { InvalidFieldError } from '@presentation/validation/errors'
import { FieldValidation } from '@presentation/validation/protocols/field-validation'

export class MinLengthValidation implements FieldValidation {
  constructor (
    readonly field: string,
    private readonly minLength: number
  ) {}

  validate (value: string): Error {
    const isValid = value.length >= this.minLength
    return isValid ? null : new InvalidFieldError()
  }
}
