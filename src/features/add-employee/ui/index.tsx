import { memo } from 'react'
import useAdditionEmployee from '../hooks/use-addition-employee'
import AddIcon from '@/shared/ui/add-icon'
import style from './styles.module.scss'

const Addition = () => {
  const { onClickAdd } = useAdditionEmployee()

  return (
    <div className={style.addition} onClick={onClickAdd}>
      <AddIcon />
    </div>
  )
}

export default memo(Addition)
