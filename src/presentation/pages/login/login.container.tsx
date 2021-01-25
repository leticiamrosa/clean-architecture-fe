import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Login from './login.web'
import Context from '@components/contexts/form-context/form-context'
import { Authentication } from '@domain/usecases'
import Validation from '@presentation/protocols/validation'

type Props = {
  validation?: Validation
  authentication?: Authentication
};

const LoginContainer: React.FC<Props> = ({ validation, authentication }: Props) => {
  const history = useHistory()

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
    try {
      if (state.isLoading || state.emailError || state.passwordError) {
        return
      }

      event.preventDefault()
      setState({
        ...state,
        isLoading: true
      })

      const account = await authentication.auth({
        email: state.email,
        password: state.password
      })

      localStorage.setItem('accessToken', account.accessToken)
      history.replace('/')
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: error.message
      })
    }
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
