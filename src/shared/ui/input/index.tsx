import { FC, memo, useEffect, useState } from 'react'
import style from './styles.module.scss'

interface IInput {
  value: string
  onChangeDebounce: (value: string) => void
}

const Input: FC<IInput> = ({ value, onChangeDebounce }) => {
  const [textValue, setTextValue] = useState(value)
  const [isFocused, setIsFocused] = useState(false)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value)
    onChangeDebounce(e.target.value)
  }

  useEffect(() => setTextValue(value), [value])

  return (
    <div className={`${style['input-wrapper']} ${isFocused ? style.focused : ''}`}>
      <input
        className={style.input}
        type="text"
        value={textValue}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {!isFocused && <div className={style.ellipsis}>{textValue}</div>}
    </div>
  )
}

export default memo(Input)
