import React, { useContext } from 'react'
import { Spinner } from '../index'
import Context from '@presentation/contexts/form-context/form-context'

import Styles from './error.styles.scss'

const Error: React.FC = () => {
  const { state } = useContext(Context)
  const { isLoading, mainError } = state

  const hasLoading = isLoading && <Spinner className={Styles.spinner}/>
  const hasError = mainError && <span data-testid="main-error" className={Styles.error}>{mainError}</span>

  return (
    <div data-testid="error-wrapper" className={Styles.errorWrapper}>
      {hasLoading}
      {hasError}
    </div>
  )
}

export default Error
