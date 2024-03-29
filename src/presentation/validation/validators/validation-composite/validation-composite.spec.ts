
import { FieldValidationSpy } from '@presentation/validation/test'
import { ValidationComposite } from './validation-composite'
import faker from 'faker'
import { ValidationBuilder as Builder } from '../builder/validation-builder'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationSpy: FieldValidationSpy[]
}

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName)
  ]

  const sut = ValidationComposite.build([
    ...Builder.field('email').required().email().build(),
    ...Builder.field('password').required().build()
  ])

  return {
    sut,
    fieldValidationSpy
  }
}

describe('ValidationComposite', () => {
  test('should return error when any validation fails', () => {
    // given
    const fieldName = faker.database.column()
    const { sut, fieldValidationSpy } = makeSut(fieldName)
    const errorMessage = faker.random.words()

    fieldValidationSpy[0].error = new Error(errorMessage)
    fieldValidationSpy[1].error = new Error(faker.random.words())

    // when
    const error = sut.validate('any_field', faker.random.words())

    // then
    expect(error).toBe(error)
  })

  test('should return error when any validation fails', () => {
    // given
    const fieldName = faker.database.column()
    const defaultErrorMessage = faker.random.words()

    const { sut } = makeSut(fieldName)

    // when
    const error = sut.validate(fieldName, defaultErrorMessage)

    // then
    expect(error).toBeFalsy()
  })
})
