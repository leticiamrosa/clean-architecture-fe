import React from 'react'
import HeaderLogin from '@presentation/components/common/header/header-login/header-login.web'
import Footer from '@presentation/components/common/footer/footer.web'
import InputText from '@presentation/components/common/input/input-text/input-text.web'
import Spinner from '@presentation/components/common/spinner/spinner.web'
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

        <div className={Styles.errorWrapper}>
          <Spinner className={Styles.spinner}/>
          <span className={Styles.error}>Erro</span>
        </div>

      </form>

      <Footer />

    </div>
  )
}

export default Login
