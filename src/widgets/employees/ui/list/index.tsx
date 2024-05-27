import { memo, FC } from 'react'
import { IEmployee } from '@/entities/employees/model/types'
import style from './styles.module.scss'

interface IListProps {
  list: IEmployee[]
  renderItem: (item: IEmployee) => React.ReactNode
}

const ListEmployees: FC<IListProps> = ({ list, renderItem }) => {
  return (
    <div className={style.list_employees}>
      <div className={style.list_employees_top}>
        <p className={`${style.list_employees_menu} ${style.list_employees_menu_name}`}>Имя</p>
        <p className={`${style.list_employees_menu} ${style.list_employees_menu_surname}`}>
          Фамилия
        </p>
        <p className={`${style.list_employees_menu} ${style.list_employees_menu_position}`}>
          Должность
        </p>
      </div>
      {list.map(item => (
        <div key={item.id} className={style.list_employees_item}>
          {renderItem(item)}
        </div>
      ))}
    </div>
  )
}

export default memo(ListEmployees)
