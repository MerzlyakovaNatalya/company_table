import { memo } from 'react'
import { TbHttpDelete } from "react-icons/tb"
import style from './styles.module.scss'

const DelIcon = () => {
  return (
    <div className={style.del_icon}>
      <TbHttpDelete size={25} />
    </div>
  )
}

export default memo(DelIcon)