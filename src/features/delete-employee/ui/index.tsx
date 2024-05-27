import { memo } from 'react'
import DeleteIcon from '@/shared/ui/del-icon-employee'
import useDeleteEmployee from '../hooks/use-delete-employee'
import style from './styles.module.scss'

const Delete = () => {
  const { onClickDelete } = useDeleteEmployee()

  return (
    <div className={style.delete} onClick={onClickDelete}>
      <DeleteIcon />
    </div>
  )
}

export default memo(Delete)
