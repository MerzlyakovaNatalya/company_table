import { MouseEventHandler } from 'react'
import { fetchCompany } from '@/entities/companies/model/actionCreators'
import { addEmployee } from '@/entities/employees/model/actionCreators'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks-store'

interface IUseAdditionEmployeeReturn {
  onClickAdd: MouseEventHandler<HTMLDivElement>
}

const useAdditionEmployee = (): IUseAdditionEmployeeReturn => {
  const dispatch = useAppDispatch()
  const companyId = useAppSelector(state => state.employees.companyId)

  const onClickAdd = () => {
    dispatch(addEmployee(companyId))
    dispatch(fetchCompany(companyId))
  }
  return { onClickAdd }
}

export default useAdditionEmployee
