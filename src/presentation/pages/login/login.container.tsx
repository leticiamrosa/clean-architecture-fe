import React, { useState } from 'react'
import Login from './login.web'
import Context from '@components/contexts/form-context/form-context'

type StateProps = {
  isLoading: boolean
  errorMessage: string
}

const LoginContainer: React.FC = () => {
  const [state] = useState<StateProps>({
    isLoading: false,
    errorMessage: ''
  })

  return (
    <Context.Provider value={state}>
      <Login />
    </Context.Provider>
  )
}

export default LoginContainer
