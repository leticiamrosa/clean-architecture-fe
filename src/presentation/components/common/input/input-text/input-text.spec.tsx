import React from 'react'
import { render } from '@testing-library/react'
import InputText from './input-text.web'
import Context from '@presentation/contexts/form-context/form-context'

describe('Input Component', () => {
  test('should begin with readOnly', () => {
    // given
    const { getByTestId } = render(
      <Context.Provider value={{ state: {} }}>
        <InputText name="field" />
      </Context.Provider>
    )

    // when
    const input = getByTestId('input-field') as HTMLInputElement

    // then
    expect(input.readOnly).toBe(true)
  })
})
