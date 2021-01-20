import React from 'react'
import Logo from '@components/logo/logo.web'
import Spinner from '@components/spinner/spinner.web'
import Styles from './login.styles.scss'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <header className={Styles.header}>
        <Logo />
        <h1>4Dev - Enquetes para Programadores</h1>
      </header>

      <form className={Styles.form}>
        <h2>Login</h2>

        <div className={Styles.inputWrapper}>
          <input type="email" name="email" placeholder="Digite o seu email"/>
          <span className={Styles.status}>🔴</span>
        </div>

        <div className={Styles.inputWrapper}>
          <input type="password" name="password" placeholder="Digite sua senha"/>
          <span className={Styles.status}>🔴</span>
        </div>

        <button className={Styles.submit} type="submit">Enviar</button>
        <span className={Styles.link}>Criar conta</span>

        <div className={Styles.errorWrapper}>
          <Spinner className={Styles.spinner}/>
          <span className={Styles.error}>Erro</span>
        </div>

      </form>

      <footer className={Styles.footer}>oi</footer>
    </div>
  )
}

export default Login
