import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import Login from './login.container'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(<Login />)

  return {
    sut
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

    // expect
    expect(errorWrapper.childElementCount).toBe(0)
    expect(submitButton.disabled).toBe(true)
    expect(inputEmail.title).toBe('Campo obrigatório')
    expect(inputEmailStatus.textContent).toBe('🔴')
    expect(inputPassword.title).toBe('Campo obrigatório')
    expect(inputPasswordStatus.textContent).toBe('🔴')
  })
})
