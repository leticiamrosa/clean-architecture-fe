import React from 'react'
import faker from 'faker'
import { fireEvent, render, RenderResult, cleanup } from '@testing-library/react'
import { ValidationStub } from '@presentation/tests/'
import Login from './login.container'

type SutTypes = {
  sut: RenderResult
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()

  validationStub.errorMessage = params?.validationError

  const sut = render(<Login validation={validationStub}/>)

  return {
    sut
  }
}

describe('Login Container', () => {
  afterEach(cleanup)

  describe('initial state', () => {
    test('should start with initial state', () => {
      // given
      const validationError = faker.random.words()
      const { sut } = makeSut({ validationError })
      const errorWrapper = sut.getByTestId('error-wrapper')
      const submitButton = sut.getByTestId('button-submit') as HTMLButtonElement
      const inputEmailStatus = sut.getByTestId('input-email-status')
      const inputPasswordStatus = sut.getByTestId('input-password-status')

      // when

      // then
      expect(errorWrapper.childElementCount).toBe(0)
      expect(submitButton.disabled).toBeTruthy()
      expect(inputEmailStatus.title).toBe(validationError)
      expect(inputEmailStatus.textContent).toBe('🔴')
      expect(inputPasswordStatus.title).toBe(validationError)
      expect(inputPasswordStatus.textContent).toBe('🔴')
    })
  })

  describe('when validation fails', () => {
    test('should show email error if Validation fails', () => {
      // given
      const validationError = faker.random.words()
      const { sut } = makeSut({ validationError })
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
      expect(inputEmailStatus.title).toBe(validationError)
      expect(inputEmailStatus.textContent).toBe('🔴')
    })

    test('should show password error if Validation fails', () => {
      // given
      const validationError = faker.random.words()
      const { sut } = makeSut({ validationError })
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
      expect(inputPasswordStatus.title).toBe(validationError)
      expect(inputPasswordStatus.textContent).toBe('🔴')
    })
  })

  describe('when the validation succeeds', () => {
    test('should show valid email state when the validation is succeeds', () => {
      // given
      const { sut } = makeSut()
      const email = faker.internet.email()
      const inputEmail = sut.getByTestId('input-email')
      const inputEmailStatus = sut.getByTestId('input-email-status')

      // when
      fireEvent.input(inputEmail, {
        target: {
          value: email
        }
      })

      // then
      expect(inputEmailStatus.title).toBe('')
      expect(inputEmailStatus.textContent).toBe('🟢')
    })

    test('should show valid password state when the validation is succeeds', () => {
      // given
      const { sut } = makeSut()
      const password = faker.internet.password()
      const inputPassword = sut.getByTestId('input-password')
      const inputPasswordStatus = sut.getByTestId('input-password-status')

      // when
      fireEvent.input(inputPassword, {
        target: {
          value: password
        }
      })

      // then
      expect(inputPasswordStatus.title).toBe('')
      expect(inputPasswordStatus.textContent).toBe('🟢')
    })

    test('show enable submit button when the form is valid', () => {
      // given
      const { sut } = makeSut()
      const email = faker.internet.email()
      const password = faker.internet.password()
      const inputEmail = sut.getByTestId('input-email')
      const inputPassword = sut.getByTestId('input-password')
      const submitButton = sut.getByTestId('button-submit') as HTMLButtonElement

      // when
      fireEvent.input(inputEmail, {
        target: {
          value: email
        }
      })
      fireEvent.input(inputPassword, {
        target: {
          value: password
        }
      })

      // then
      expect(submitButton.disabled).toBeFalsy()
    })

    test('should show spinner on submit', () => {
      // given
      const { sut } = makeSut()
      const email = faker.internet.email()
      const password = faker.internet.password()
      const inputEmail = sut.getByTestId('input-email')
      const inputPassword = sut.getByTestId('input-password')
      const submitButton = sut.getByTestId('button-submit') as HTMLButtonElement

      // when
      fireEvent.input(inputEmail, {
        target: {
          value: email
        }
      })
      fireEvent.input(inputPassword, {
        target: {
          value: password
        }
      })
      fireEvent.click(submitButton)
      const spinner = sut.getByTestId('spinner')

      // then
      expect(submitButton.disabled).toBeFalsy()
      expect(spinner).toBeTruthy()
    })
  })
})
