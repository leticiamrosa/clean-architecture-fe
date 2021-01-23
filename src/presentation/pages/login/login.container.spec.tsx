import React from 'react'
import faker from 'faker'
import { fireEvent, render, RenderResult, cleanup } from '@testing-library/react'
import { ValidationStub } from '@presentation/tests/'
import Login from './login.container'

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = faker.random.words()

  const sut = render(<Login validation={validationStub}/>)

  return {
    sut,
    validationStub
  }
}

describe('Login Container', () => {
  afterEach(cleanup)

  describe('initial state', () => {
    test('should start with initial state', () => {
      // given
      const { sut, validationStub } = makeSut()

      // when
      const errorWrapper = sut.getByTestId('error-wrapper')
      const submitButton = sut.getByTestId('button-submit') as HTMLButtonElement
      const inputEmailStatus = sut.getByTestId('input-email-status')
      const inputPasswordStatus = sut.getByTestId('input-password-status')

      // then
      expect(errorWrapper.childElementCount).toBe(0)
      expect(submitButton.disabled).toBe(true)
      expect(inputEmailStatus.title).toBe(validationStub.errorMessage)
      expect(inputEmailStatus.textContent).toBe('🔴')
      expect(inputPasswordStatus.title).toBe(validationStub.errorMessage)
      expect(inputPasswordStatus.textContent).toBe('🔴')
    })
  })

  describe('when validation fails', () => {
    test('should show email error if Validation fails', () => {
      // given
      const { sut, validationStub } = makeSut()
      const email = faker.internet.email()
      const emailInput = sut.getByTestId('input-email')
      const inputEmailStatus = sut.getByTestId('input-email-status')

      // when
      fireEvent.input(emailInput, {
        target: {
          value: email
        }
      })

      // then
      expect(inputEmailStatus.title).toBe(validationStub.errorMessage)
      expect(inputEmailStatus.textContent).toBe('🔴')
    })

    test('should show password error if Validation fails', () => {
      // given
      const { sut, validationStub } = makeSut()
      const password = faker.internet.password()
      const passwordInput = sut.getByTestId('input-password')
      const inputPasswordStatus = sut.getByTestId('input-password-status')

      // when
      fireEvent.input(passwordInput, {
        target: {
          value: password
        }
      })

      // then
      expect(inputPasswordStatus.title).toBe(validationStub.errorMessage)
      expect(inputPasswordStatus.textContent).toBe('🔴')
    })
  })

  describe('when the validation succeeds', () => {
    test('should show valid email state if validation succeeds', () => {
      // given
      const { sut, validationStub } = makeSut()
      const email = faker.internet.email()
      const inputEmail = sut.getByTestId('input-email')
      const inputEmailStatus = sut.getByTestId('input-email-status')

      // when
      validationStub.errorMessage = null
      fireEvent.input(inputEmail, {
        target: {
          value: email
        }
      })

      // then
      expect(inputEmailStatus.title).toBe('')
      expect(inputEmailStatus.textContent).toBe('🟢')
    })

    test('should show valid password state if validation succeeds', () => {
      // given
      const { sut, validationStub } = makeSut()
      const password = faker.internet.password()
      const inputPassword = sut.getByTestId('input-password')
      const inputPasswordStatus = sut.getByTestId('input-password-status')

      // when
      validationStub.errorMessage = null
      fireEvent.input(inputPassword, {
        target: {
          value: password
        }
      })

      // then
      expect(inputPasswordStatus.title).toBe('')
      expect(inputPasswordStatus.textContent).toBe('🟢')
    })
  })
})
