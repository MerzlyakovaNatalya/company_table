import { memo, FC } from 'react'
import { ICompany } from '@/entities/companies/model/types'
import useListCompanies from '../../hooks/use-list-companies'
import style from './styles.module.scss'

interface IListProps {
  list: ICompany[]
  renderItem: (item: ICompany) => React.ReactNode
  loadMoreItems: () => void
}

const ListCompanies: FC<IListProps> = ({ list, renderItem, loadMoreItems }) => {
  const { handleScroll, listContainerRef } = useListCompanies({ list, loadMoreItems })

  return (
    <div className={style.list_companies} onScroll={handleScroll} ref={listContainerRef}>
      <div className={style.list_companies_top}>
        <p className={`${style.list_companies_menu} ${style.list_companies_menu_name}`}>Название</p>
        <p className={`${style.list_companies_menu} ${style.list_companies_menu_count}`}>
          Сотрудники
        </p>
        <p className={`${style.list_companies_menu} ${style.list_companies_menu_address}`}>Адрес</p>
      </div>
      {list.map(item => (
        <div key={item.id} className={style.list_companies_item}>
          {renderItem(item)}
        </div>
      ))}
    </div>
  )
}

export default memo(ListCompanies)
