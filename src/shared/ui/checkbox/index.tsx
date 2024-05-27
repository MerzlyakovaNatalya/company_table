import { FC, memo, useEffect, useState } from 'react'
import { GoCheckbox } from 'react-icons/go'
import style from './styles.module.scss'

interface ICheckbox {
  handleToggle: () => void
  toggle?: boolean
}

const Checkbox: FC<ICheckbox> = ({ handleToggle, toggle = false }) => {
  const [isToggle, setIsToggle] = useState(false)

  const onClickCheckbox = () => {
    setIsToggle(!isToggle)
    handleToggle()
  }

  useEffect(() => {
    toggle && setIsToggle(true)
    !toggle && setIsToggle(false)
  }, [toggle])

  return (
    <div className={style.checkbox}>
      <GoCheckbox color={isToggle ? 'rgb(236 59 255)' : ''} onClick={onClickCheckbox} />
    </div>
  )
}

export default memo(Checkbox)
