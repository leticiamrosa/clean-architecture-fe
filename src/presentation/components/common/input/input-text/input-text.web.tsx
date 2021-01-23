import React, { useContext } from 'react'
import Styles from './input-text.styles.scss'
import Context from '@components/contexts/form-context/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const InputText: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context)
  const error = state[`${props.name}Error`]

  const onFocus = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  const getStatus = (): string => {
    return error ? '🔴' : '🟢'
  }

  const getTitle = (): string => {
    return error || ''
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    return setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  return (
    <div className={Styles.inputWrapper}>
      <input data-testid={`input-${props.name}`} readOnly onFocus={onFocus} onChange={handleChange} {...props}/>
      <span data-testid={`input-${props.name}-status`} className={Styles.status} title={getTitle()}>
        {getStatus()}
      </span>
    </div>
  )
}

export default InputText
