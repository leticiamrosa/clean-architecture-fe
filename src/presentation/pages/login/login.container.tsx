import React, { useState, useEffect } from 'react'
import Login from './login.web'
import Context from '@components/contexts/form-context/form-context'
import Validation from '@presentation/protocols/validation'

type Props = {
  validation: Validation
};

const LoginContainer: React.FC<Props> = ({ validation }: Props) => {
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

  return (
    <Context.Provider value={{ state, setState }}>
      <Login />
    </Context.Provider>
  )
}

export default LoginContainer
