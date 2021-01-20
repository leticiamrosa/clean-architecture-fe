import React from 'react'
import Styles from './input-text.styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const InputText: React.FC<Props> = (props: Props) => {
  return (
    <div className={Styles.inputWrapper}>
      <input {...props} />
      <span className={Styles.status}>🔴</span>
    </div>
  )
}

export default InputText
