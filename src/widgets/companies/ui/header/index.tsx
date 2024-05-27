import CheckboxAll from '@/features/checkbox-all-companies/ui'
import AddCompany from '@/features/add-company/ui'
import DeleteCompany from '@/features/delete-company/ui'
import style from './styles.module.scss'

const HeaderCompanies = () => {
  return (
    <div className={style.header}>
      <CheckboxAll />
      <div className={style.header_inner}>
        <AddCompany />
        <DeleteCompany />
      </div>
    </div>
  )
}

export default HeaderCompanies
