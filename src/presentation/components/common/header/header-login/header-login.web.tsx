import React, { memo } from 'react'
import Logo from '@presentation/components/common/logo/logo.web'
import Styles from './header-login.styles.scss'

const HeaderLogin: React.FC = () => {
  return (
    <header className={Styles.header}>
      <Logo />
      <h1>4Dev - Enquetes para Programadores</h1>
    </header>
  )
}

export default memo(HeaderLogin)
