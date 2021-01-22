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

    // expect
    expect(errorWrapper.childElementCount).toBe(0)
    expect(submitButton.disabled).toBe(true)
  })
})
