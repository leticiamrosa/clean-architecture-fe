/* eslint-disable @typescript-eslint/no-unused-vars-experimental */
import { InvalidFieldError } from '@presentation/validation/errors'
import { FieldValidation } from '@presentation/validation/protocols/field-validation'

export class MinLengthValidation implements FieldValidation {
  constructor (
    readonly field: string,
    private readonly minLength: number
  ) {}

  validate (value: string): Error {
    return new InvalidFieldError()
  }
}
