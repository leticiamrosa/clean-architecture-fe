import { ValidationComposite } from '@presentation/validation/validators'
import { ValidationBuilder } from '@presentation/validation/validators/builder/validation-builder'
import { makeLoginValidation } from '@main/factories/pages/login/login-validation-factory'

describe('LoginValidationFactory', () => {
  test('should make ValidationComposite with correct validators', () => {
    // given
    const expectedComposite = ValidationComposite.build([
      ...ValidationBuilder.field('email').required().email().build(),
      ...ValidationBuilder.field('password').required().min(5).build()
    ])
    // when
    const composite = makeLoginValidation()

    // then
    expect(composite).toEqual(expectedComposite)
  })
})
