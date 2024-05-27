import { memo } from 'react'
import { RiAddLargeFill } from 'react-icons/ri'
import style from './styles.module.scss'

const PlusIcon = () => {
  return (
    <div className={style.plus_icon}>
      <RiAddLargeFill />
    </div>
  )
}

export default memo(PlusIcon)
