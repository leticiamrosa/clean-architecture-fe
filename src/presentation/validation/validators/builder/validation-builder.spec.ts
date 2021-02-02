
import { RequiredFieldValidation } from '@presentation/validation/validators'
import {
  ValidationBuilder as sut
} from './validation-builder'

describe('ValidationBuilder', () => {
  test('should return RequiredFieldValidation', () => {
    // given
    const expectedErrorField = new RequiredFieldValidation('any_field')

    // when
    const validations = sut.field('any_field').required().buid()

    // then
    expect(validations).toEqual([expectedErrorField])
  })
})
