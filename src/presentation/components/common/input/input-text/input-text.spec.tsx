import React from 'react'
import faker from 'faker'
import { fireEvent, render, RenderResult } from '@testing-library/react'
import InputText from './input-text.web'
import Context from '@presentation/contexts/form-context/form-context'

const makeSut = (
  fieldName: string
): RenderResult => {
  return render(
    <Context.Provider value={{ state: {} }}>
      <InputText name={fieldName} />
    </Context.Provider>
  )
}

describe('Input Component', () => {
  test('should begin with readOnly', () => {
    // given
    const field = faker.database.column()
    const sut = makeSut(field)

    // when
    const input = sut.getByTestId(`input-${field}`) as HTMLInputElement

    // then
    expect(input.readOnly).toBe(true)
  })

  test('should remove readOnly on focus', () => {
    // given
    const field = faker.database.column()
    const sut = makeSut(field)

    // when
    const input = sut.getByTestId(`input-${field}`) as HTMLInputElement
    fireEvent.focus(input)

    // then
    expect(input.readOnly).toBe(false)
  })
})
