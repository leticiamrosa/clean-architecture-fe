
import { RequiredFieldValidation } from '@presentation/validation/validators'
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
    this.validations.push(new RequiredFieldValidation(this.fieldName))
    return this
  }

  buid (): FieldValidation[] {
    return this.validations
  }
}
