import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import InputText from './input-text.web'
import Context from '@presentation/contexts/form-context/form-context'

const makeSut = (): RenderResult => {
  return render(
    <Context.Provider value={{ state: {} }}>
      <InputText name="field" />
    </Context.Provider>
  )
}

describe('Input Component', () => {
  test('should begin with readOnly', () => {
    // given
    const sut = makeSut()

    // when
    const input = sut.getByTestId('input-field') as HTMLInputElement

    // then
    expect(input.readOnly).toBe(true)
  })
})
