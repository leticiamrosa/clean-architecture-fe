import React from 'react'
import { render } from '@testing-library/react'
import Login from './login.container'

describe('Login Container', () => {
  test('should start with initial state', () => {
    // given
    const { getByTestId } = render(<Login />)

    // when
    const errorWrapper = getByTestId('error-wrapper')
    const submitButton = getByTestId('button-submit') as HTMLButtonElement
    const inputEmail = getByTestId('input-email')
    const inputPassword = getByTestId('input-password')
    const inputEmailStatus = getByTestId('input-email-status')
    const inputPasswordStatus = getByTestId('input-password-status')

    // expect
    expect(errorWrapper.childElementCount).toBe(0)
    expect(submitButton.disabled).toBe(true)
    expect(inputEmail.title).toBe('Campo obrigatório')
    expect(inputEmailStatus.textContent).toBe('🔴')
    expect(inputPassword.title).toBe('Campo obrigatório')
    expect(inputPasswordStatus.textContent).toBe('🔴')
  })
})
