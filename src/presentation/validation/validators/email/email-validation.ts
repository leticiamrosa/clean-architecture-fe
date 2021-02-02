import { InvalidFieldError } from '@presentation/validation/errors'
import { FieldValidation } from '@presentation/validation/protocols/field-validation'

export class EmailValidation implements FieldValidation {
  constructor (readonly field: string) {}

  validate (value: string): Error {
    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    const isEmailValid = !value || emailRegex.test(value)

    return isEmailValid ? null : new InvalidFieldError()
  }
}
