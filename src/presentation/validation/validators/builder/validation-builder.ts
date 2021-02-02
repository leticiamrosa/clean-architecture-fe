
import { RequiredFieldValidation, EmailValidation } from '@presentation/validation/validators'
import { FieldValidation } from '@presentation/validation/protocols/field-validation'

export class ValidationBuilder {
  private constructor (
    private readonly fieldName: string,
    private readonly validations: FieldValidation[]
  ) {}

  static field (fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, [])
  }

  required (): ValidationBuilder {
    const requiredFieldValidation = new RequiredFieldValidation(this.fieldName)

    this.validations.push(requiredFieldValidation)
    return this
  }

  email (): ValidationBuilder {
    const emailValidation = new EmailValidation(this.fieldName)

    this.validations.push(emailValidation)
    return this
  }

  build (): FieldValidation[] {
    return this.validations
  }
}
