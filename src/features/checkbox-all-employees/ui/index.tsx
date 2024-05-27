import { memo } from 'react'
import useCheckboxAll from '@/features/checkbox-all-employees/hooks/use-checkbox-all'
import Checkbox from '@/shared/ui/checkbox'
import style from './styles.module.scss'

const CheckboxAllEmployees = () => {
  const { checkbox, chooseAll } = useCheckboxAll()

  return (
    <div className={style.checkbox_all}>
      <Checkbox handleToggle={chooseAll} toggle={checkbox} />
      <p className={style.checkbox_all_text}>Выделить всё</p>
    </div>
  )
}

export default memo(CheckboxAllEmployees)
