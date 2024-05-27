import { memo } from 'react'
import DelIcon from '@/shared/ui/del-icon-company'
import useDeleteCompany from '../hooks/use-delete-company'
import style from './styles.module.scss'

const DeleteCompany = () => {
  const { onClickDelete } = useDeleteCompany()

  return (
    <div className={style.delete_company} onClick={onClickDelete}>
      <DelIcon />
    </div>
  )
}

export default memo(DeleteCompany)
