import React, { useState, useEffect } from 'react'
import Login from './login.web'
import Context from '@components/contexts/form-context/form-context'
import { Authentication } from '@domain/usecases'
import Validation from '@presentation/protocols/validation'

type Props = {
  validation?: Validation
  authentication?: Authentication
};

const LoginContainer: React.FC<Props> = ({ validation, authentication }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password)
    })
  }, [state.email, state.password])

  const isValid = !!state.emailError || !!state.passwordError

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    if (state.isLoading) {
      return
    }

    event.preventDefault()
    setState({
      ...state,
      isLoading: true
    })

    await authentication.auth({
      email: state.email,
      password: state.password
    })
  }

  return (
    <Context.Provider value={{ state, setState }}>
      <Login
        isValid={isValid}
        handleSubmit={handleSubmit}
      />
    </Context.Provider>
  )
}

export default LoginContainer
