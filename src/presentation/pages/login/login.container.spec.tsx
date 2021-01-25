import React from 'react'
import faker from 'faker'
import 'jest-localstorage-mock'
import { fireEvent, render, RenderResult, cleanup, waitFor } from '@testing-library/react'
import { ValidationStub, AuthenticationSpy } from '@presentation/tests/'
import Login from './login.container'
import { InvalidCredentialsError } from '@domain/errors'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()

  validationStub.errorMessage = params?.validationError

  const sut = render(<Login validation={validationStub} authentication={authenticationSpy}/>)

  return {
    sut,
    authenticationSpy
  }
}

const simulateValidSubmit = (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): void => {
  populateEmailField(sut, email)
  populatePasswordField(sut, password)
  buttonSubmitClick(sut)
}

const buttonSubmitClick = (
  sut: RenderResult
): void => {
  const submitButton = sut.getByTestId('button-submit') as HTMLButtonElement
  fireEvent.click(submitButton)
}

const populateEmailField = (
  sut: RenderResult,
  email = faker.internet.email()
): void => {
  const inputEmail = sut.getByTestId('input-email')

  fireEvent.input(inputEmail, {
    target: {
      value: email
    }
  })
}

const populatePasswordField = (
  sut: RenderResult,
  password = faker.internet.password()
): void => {
  const inputPassword = sut.getByTestId('input-password')

  fireEvent.input(inputPassword, {
    target: {
      value: password
    }
  })
}

const simulateStatusForField = (
  sut: RenderResult,
  fieldName: string
): HTMLElement => {
  return sut.getByTestId(`input-${fieldName}-status`)
}

describe('Login Container', () => {
  afterEach(cleanup)
  beforeEach(() => {
    localStorage.clear()
  })

  describe('initial state', () => {
    test('should start with initial state', () => {
      // given
      const validationError = faker.random.words()
      const { sut } = makeSut({ validationError })
      const errorWrapper = sut.getByTestId('error-wrapper')
      const submitButton = sut.getByTestId('button-submit') as HTMLButtonElement
      const inputEmailStatus = simulateStatusForField(sut, 'email')
      const inputPasswordStatus = simulateStatusForField(sut, 'password')

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
      const inputEmailStatus = simulateStatusForField(sut, 'email')

      // when
      populatePasswordField(sut)

      // then
      expect(inputEmailStatus.title).toBe(validationError)
      expect(inputEmailStatus.textContent).toBe('🔴')
    })

    test('should show password error if Validation fails', () => {
      // given
      const validationError = faker.random.words()
      const { sut } = makeSut({ validationError })
      const inputPasswordStatus = simulateStatusForField(sut, 'password')

      // when
      populatePasswordField(sut)

      // then
      expect(inputPasswordStatus.title).toBe(validationError)
      expect(inputPasswordStatus.textContent).toBe('🔴')
    })
  })

  describe('when the validation succeeds', () => {
    test('should show valid email state when the validation is succeeds', () => {
      // given
      const { sut } = makeSut()
      const inputEmailStatus = simulateStatusForField(sut, 'email')

      // when
      populatePasswordField(sut)
      // then
      expect(inputEmailStatus.title).toBe('')
      expect(inputEmailStatus.textContent).toBe('🟢')
    })

    test('should show valid password state when the validation is succeeds', () => {
      // given
      const { sut } = makeSut()
      const inputPasswordStatus = simulateStatusForField(sut, 'password')

      // when
      populatePasswordField(sut)

      // then
      expect(inputPasswordStatus.title).toBe('')
      expect(inputPasswordStatus.textContent).toBe('🟢')
    })

    test('show enable submit button when the form is valid', () => {
      // given
      const { sut } = makeSut()
      const submitButton = sut.getByTestId('button-submit') as HTMLButtonElement

      // when
      populateEmailField(sut)
      populatePasswordField(sut)

      // then
      expect(submitButton.disabled).toBeFalsy()
    })

    test('should show spinner on submit', () => {
      // given
      const { sut } = makeSut()

      // when
      simulateValidSubmit(sut)
      const spinner = sut.getByTestId('spinner')

      // then
      expect(spinner).toBeTruthy()
    })
  })

  describe('authentication', () => {
    test('should call Authentication with correct values', () => {
      const { sut, authenticationSpy } = makeSut()
      const email = faker.internet.email()
      const password = faker.internet.password()

      // when
      simulateValidSubmit(sut, email, password)

      // then
      expect(authenticationSpy.params).toEqual({
        email,
        password
      })
    })

    test('should call Authentication only once', () => {
      const { sut, authenticationSpy } = makeSut()

      // when
      simulateValidSubmit(sut)
      simulateValidSubmit(sut)

      // then
      expect(authenticationSpy.callsCount).toBe(1)
    })

    test('should not call Authentication if form is invalid', () => {
      // given
      const validationError = faker.random.words()
      const { sut, authenticationSpy } = makeSut({ validationError })

      // when
      populateEmailField(sut)
      fireEvent.submit(sut.getByTestId('form'))

      // then
      expect(authenticationSpy.callsCount).toBe(0)
    })

    test('should present error when the authentication fails', async () => {
      // given
      const { sut, authenticationSpy } = makeSut()
      const error = new InvalidCredentialsError()
      const errorWrapper = sut.getByTestId('error-wrapper')

      // when
      jest.spyOn(authenticationSpy, 'auth')
        .mockReturnValueOnce(Promise.reject(error))
      simulateValidSubmit(sut)
      await waitFor(() => errorWrapper)
      const mainError = sut.getByTestId('main-error')

      // then
      expect(mainError.textContent).toBe(error.message)
      expect(errorWrapper.childElementCount).toBe(1)
    })

    test('should add accessToken to localstorage on success', async () => {
      // given
      const { sut, authenticationSpy } = makeSut()
      const accessToken = authenticationSpy.account.accessToken

      // when
      simulateValidSubmit(sut)
      await waitFor(() => sut.getByTestId('form'))

      // then
      expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', accessToken)
    })
  })
})
