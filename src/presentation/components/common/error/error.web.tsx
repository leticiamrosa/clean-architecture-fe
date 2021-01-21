import React from 'react'
import { Spinner } from '../index'

import Styles from './error.styles.scss'

const Error: React.FC = () => {
  return (
    <div className={Styles.errorWrapper}>
      <Spinner className={Styles.spinner}/>
      <span className={Styles.error}>Erro</span>
    </div>
  )
}

export default Error
