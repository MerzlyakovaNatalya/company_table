import { deleteCompanies } from '@/entities/companies/model/actionCreators'
import { deleteCompanyToSelected } from '@/entities/companies/model/companiesSlice'
import { deleteСompanyId } from '@/entities/employees/model/employeesSlice'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks-store'

const useDeleteCompany = () => {
  const dispatch = useAppDispatch()
  const selectedCompanies = useAppSelector(state => state.companies.selectedCompaniesId)

  const onClickDelete = () => {
    selectedCompanies.forEach(item => {
      dispatch(deleteCompanies(item))
      dispatch(deleteCompanyToSelected(item))
      dispatch(deleteСompanyId())
    })
  }

  return { onClickDelete }
}

export default useDeleteCompany
