import React, { useContext } from 'react'
import Styles from './input-text.styles.scss'
import Context from '@components/contexts/form-context/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const InputText: React.FC<Props> = (props: Props) => {
  const { errorState } = useContext(Context)
  const { error } = errorState[props.name]

  const onFocus = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  const getStatus = (): string => {
    return '🔴'
  }

  const getTitle = (): string => {
    return error
  }

  return (
    <div className={Styles.inputWrapper}>
      <input {...props} readOnly onFocus={onFocus} title={getTitle()}/>
      <span data-testid={`input-${props.name}-status`} className={Styles.status}>
        {getStatus()}
      </span>
    </div>
  )
}

export default InputText
