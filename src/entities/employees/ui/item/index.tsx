import { FC, memo } from 'react'
import { IEmployee } from '../../model/types'
import Checkbox from '@/shared/ui/checkbox'
import Input from '@/shared/ui/input'
import useEmployeesItem from '../../hooks/use-employees-item'
import style from './styles.module.scss'

interface IEmployeesItem {
  item: IEmployee
}
const EmployeesItem: FC<IEmployeesItem> = ({ item }) => {
  const {  
    toggleCheckbox, 
    selected,
    onCheckbox, 
    onCangeName, 
    onCangeSurname,
    onCangePosition 
  } = useEmployeesItem({ item })

  return (
    <div className={`${style.item_employees} ${selected ? style.item_employees_selected : ''}`}>
      <Checkbox handleToggle={onCheckbox} toggle={toggleCheckbox} />
      <div className={style.item_employees_text}>
        <Input value={item.name} onChangeDebounce={onCangeName} />
      </div>
      <div className={style.item_employees_text}>
        <Input value={item.surname} onChangeDebounce={onCangeSurname} />
      </div>
      <div className={style.item_employees_text}>
        <Input value={item.position} onChangeDebounce={onCangePosition} />
      </div>
    </div>
  )
}

export default memo(EmployeesItem)
