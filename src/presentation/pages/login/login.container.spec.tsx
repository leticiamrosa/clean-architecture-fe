import React from 'react'
import { render } from '@testing-library/react'
import Login from './login.container'

describe('Login Component', () => {
  test('should not render spinner and error on start', () => {
    // given
    const { getByTestId } = render(<Login />)
    // when
    const errorWrapper = getByTestId('error-wrapper')

    // expect
    expect(errorWrapper.childElementCount).toBe(0)
  })
})
