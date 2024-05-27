import { memo } from 'react'
import style from './styles.module.scss'
import PlusIcon from '@/shared/ui/plus-icon'
import useAddCompany from '../hooks/use-add-company'

const AddCompany = () => {
  const { onClickAdd } = useAddCompany()
  return (
    <div className={style.add_company} onClick={onClickAdd}>
      <PlusIcon />
    </div>
  )
}

export default memo(AddCompany)
