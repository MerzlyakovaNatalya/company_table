import { memo } from 'react'
import { HiOutlineUserAdd } from 'react-icons/hi'
import style from './styles.module.scss'

const AddIcon = () => {
  return (
    <div className={style.add_icon}>
      <HiOutlineUserAdd size={20} />
    </div>
  )
}

export default memo(AddIcon)
