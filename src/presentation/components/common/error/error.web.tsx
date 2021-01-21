import React, { useContext } from 'react'
import { Spinner } from '../index'
import Context from '@components/contexts/form-context/form-context'

import Styles from './error.styles.scss'

const Error: React.FC = () => {
  const { isLoading, errorMessage } = useContext(Context)

  const hasLoading = isLoading && <Spinner className={Styles.spinner}/>
  const hasError = errorMessage && <span className={Styles.error}>{errorMessage}</span>

  return (
    <div data-testid="error-wrapper" className={Styles.errorWrapper}>
      {hasLoading}
      {hasError}
    </div>
  )
}

export default Error
