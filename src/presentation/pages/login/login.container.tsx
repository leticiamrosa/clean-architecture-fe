import React, { useState } from 'react'
import Login from './login.web'
import Context from '@components/contexts/form-context/form-context'

const LoginContainer: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    errorMessage: ''
  })

  const [errorState] = useState({
    email: {
      error: 'Campo obrigatório',
      message: ''
    },
    password: {
      error: 'Campo obrigatório',
      message: ''
    },
    defaultMessage: ''
  })

  return (
    <Context.Provider value={{ state, errorState }}>
      <Login />
    </Context.Provider>
  )
}

export default LoginContainer
