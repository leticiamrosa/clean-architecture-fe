import React from 'react'
import Styles from './input-text.styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const InputText: React.FC<Props> = (props: Props) => {
  const onFocus = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  return (
    <div className={Styles.inputWrapper}>
      <input {...props} readOnly onFocus={onFocus}/>
      <span className={Styles.status}>🔴</span>
    </div>
  )
}

export default InputText
