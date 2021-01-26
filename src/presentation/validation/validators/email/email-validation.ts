import { InvalidFieldError } from '@presentation/validation/errors'
import { FieldValidation } from '@presentation/validation/protocols/field-validation'

export class EmailValidation implements FieldValidation {
  value: string
  constructor (readonly field: string) {}

  validate (value: string): Error {
    this.value = value
    return new InvalidFieldError()
  }
}
