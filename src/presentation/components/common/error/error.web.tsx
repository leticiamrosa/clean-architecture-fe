import React, { useContext } from 'react'
import { Spinner } from '../index'
import Context from '@components/contexts/form-context/form-context'

import Styles from './error.styles.scss'

const Error: React.FC = () => {
  const { state } = useContext(Context)
  const { isLoading, error } = state

  const hasLoading = isLoading && <Spinner className={Styles.spinner}/>
  const hasError = error.defaultMessage && <span className={Styles.error}>{error.defaultMessage}</span>

  return (
    <div data-testid="error-wrapper" className={Styles.errorWrapper}>
      {hasLoading}
      {hasError}
    </div>
  )
}

export default Error
