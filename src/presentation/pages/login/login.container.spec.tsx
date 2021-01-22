import React from 'react'
import { fireEvent, render, RenderResult } from '@testing-library/react'
import Validation from '@presentation/protocols/validation'
import Login from './login.container'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}

class ValidationSpy implements Validation {
  errorMessage: string;
  fieldName: string
  fieldValue: string

  validate (fieldName: string, fieldValue: string): string {
    this.fieldName = fieldName
    this.fieldValue = fieldValue
    return this.errorMessage
  };
};

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = render(<Login validation={validationSpy}/>)

  return {
    sut,
    validationSpy
  }
}

describe('Login Container', () => {
  test('should start with initial state', () => {
    // given
    const { sut } = makeSut()

    // when
    const errorWrapper = sut.getByTestId('error-wrapper')
    const submitButton = sut.getByTestId('button-submit') as HTMLButtonElement
    const inputEmail = sut.getByTestId('input-email')
    const inputPassword = sut.getByTestId('input-password')
    const inputEmailStatus = sut.getByTestId('input-email-status')
    const inputPasswordStatus = sut.getByTestId('input-password-status')

    // then
    expect(errorWrapper.childElementCount).toBe(0)
    expect(submitButton.disabled).toBe(true)
    expect(inputEmail.title).toBe('Campo obrigatório')
    expect(inputEmailStatus.textContent).toBe('🔴')
    expect(inputPassword.title).toBe('Campo obrigatório')
    expect(inputPasswordStatus.textContent).toBe('🔴')
  })

  test('should call validation with correct value email', () => {
    // given
    const { sut, validationSpy } = makeSut()
    const emailInput = sut.getByTestId('input-email')

    // when
    fireEvent.input(emailInput, {
      target: {
        value: 'any_email'
      }
    })

    // then
    expect(validationSpy.fieldName).toBe('email')
    expect(validationSpy.fieldValue).toBe('any_email')
  })

  test('should call validation with correct value password', () => {
    // given
    const { sut, validationSpy } = makeSut()
    const passwordInput = sut.getByTestId('input-password')

    // when
    fireEvent.input(passwordInput, {
      target: {
        value: 'any_password'
      }
    })

    // then
    expect(validationSpy.fieldName).toBe('password')
    expect(validationSpy.fieldValue).toBe('any_password')
  })
})
