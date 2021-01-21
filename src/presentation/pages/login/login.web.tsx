import React from 'react'
import {
  Footer,
  HeaderLogin,
  InputText,
  Error
} from '@components/common'
import Styles from './login.styles.scss'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <HeaderLogin />

      <form className={Styles.form}>
        <h2>Login</h2>

        <InputText type="email" name="email" placeholder="Digite seu e-mail"/>
        <InputText type="password" name="password" placeholder="Digite sua senha"/>

        <button className={Styles.submit} type="submit">Enviar</button>
        <span className={Styles.link}>Criar conta</span>

        <Error />

      </form>

      <Footer />

    </div>
  )
}

export default Login
