import CheckboxAllEmployees from '@/features/checkbox-all-employees/ui'
import Addition from '@/features/add-employee/ui'
import Delete from '@/features/delete-employee/ui'
import style from './styles.module.scss'

const HeaderEmployees = () => {
  return (
    <div className={style.header}>
      <CheckboxAllEmployees />
      <div className={style.header_inner}>
        <Addition />
        <Delete />
      </div>
    </div>
  )
}

export default HeaderEmployees
