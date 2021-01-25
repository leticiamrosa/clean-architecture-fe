import React from 'react'
import {
  Footer,
  HeaderLogin,
  InputText,
  Error
} from '@components/common'
import Styles from './login.styles.scss'

type Props = {
  isValid: boolean
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

const Login: React.FC<Props> = ({
  isValid,
  handleSubmit
}: Props) => {
  return (
    <div className={Styles.login}>

      <HeaderLogin />

      <form className={Styles.form} onSubmit={handleSubmit} data-testid="form">
        <h2>Login</h2>
        <InputText data-testid="input-email" type="email" name="email" placeholder="Digite seu e-mail"/>
        <InputText data-testid="input-password" type="password" name="password" placeholder="Digite sua senha"/>
        <button data-testid="button-submit" disabled={isValid} className={Styles.submit} type="submit">Enviar</button>
        <span className={Styles.link}>Criar conta</span>
        <Error />
      </form>

      <Footer />

    </div>
  )
}

export default Login
