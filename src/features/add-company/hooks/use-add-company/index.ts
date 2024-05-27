import { addNewCompany, fetchCompanies } from '@/entities/companies/model/actionCreators'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks-store'
import { MouseEventHandler } from 'react'

interface IUseAddCompanyReturn {
  onClickAdd: MouseEventHandler<HTMLDivElement>
}

const useAddCompany = (): IUseAddCompanyReturn => {
  const dispatch = useAppDispatch()
  const companies = useAppSelector(state => state.companies.companies)

  const onClickAdd = () => {
    if (companies.length < 1) {
      dispatch(fetchCompanies({ offset: 0, limit: 50 }))
    } else {
      dispatch(addNewCompany())
    }
  }
  return { onClickAdd }
}

export default useAddCompany
