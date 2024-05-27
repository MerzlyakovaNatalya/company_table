import { FC, memo } from 'react'
import { ICompany } from '../../model/types'
import Checkbox from '@/shared/ui/checkbox'
import Input from '@/shared/ui/input'
import style from './styles.module.scss'
import useCompaniesItem from '../../hooks/use-companies-item'

interface ICompaniesItem {
  item: ICompany
  onOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const CompaniesItem: FC<ICompaniesItem> = ({ item, onOpen }) => {
  const { 
    selected, 
    toggleCheckbox, 
    onCheckbox, 
    onCangeName, 
    onCangeAddress 
  } = useCompaniesItem({ item, onOpen,})

  return (
    <div className={`${style.item_companies} ${selected ? style.item_companies_selected : ''}`}>
      <Checkbox handleToggle={onCheckbox} toggle={toggleCheckbox} />
      <div className={style.item_companies_text}>
        <Input value={item.name} onChangeDebounce={onCangeName} />
      </div>
      <div className={style.item_companies_text}>{item.quantity}</div>
      <div className={`${style.item_companies_text} ${style.item_companies_text_last}`}>
        <Input value={item.address} onChangeDebounce={onCangeAddress} />
      </div>
    </div>
  )
}

export default memo(CompaniesItem)
