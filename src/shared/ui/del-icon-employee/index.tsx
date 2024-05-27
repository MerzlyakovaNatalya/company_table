import { memo } from 'react'
import { AiOutlineUserDelete } from "react-icons/ai"
import style from './styles.module.scss'

const DeleteIcon = () => {
  return (
    <div className={style.delete_icon}>
      <AiOutlineUserDelete size={20} />
    </div>
  )
}

export default memo(DeleteIcon)