import { memo } from 'react'
import Checkbox from '@/shared/ui/checkbox'
import useCheckboxAll from '../hooks/use-checkbox-all'
import style from './styles.module.scss'

const CheckboxAll = () => {
  const { checkbox, chooseAll } = useCheckboxAll()

  return (
    <div className={style.checkbox_all}>
      <Checkbox handleToggle={chooseAll} toggle={checkbox} />
      <p className={style.checkbox_all_text}>Выделить всё</p>
    </div>
  )
}

export default memo(CheckboxAll)
