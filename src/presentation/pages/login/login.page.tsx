import React from 'react'
import { Authentication, SaveAccessToken } from '@domain/usecases'
import Validation from '@presentation/protocols/validation'
import LoginContainer from './login.container'

type Props = {
  validation?: Validation
  authentication?: Authentication
  saveAccessToken: SaveAccessToken
}

const LoginPage: React.FC<Props> = (props: Props) => {
  return (
    <LoginContainer {...props} />
  )
}

export default LoginPage
