import { FieldValidation } from '@presentation/validation/protocols/field-validation'
import { RequiredFieldError } from '@presentation/validation/errors'

export class RequiredFieldValidation implements FieldValidation {
  value: string

  constructor (readonly field: string) {}

  validate (value: string): Error {
    this.value = value
    return new RequiredFieldError()
  }
};
