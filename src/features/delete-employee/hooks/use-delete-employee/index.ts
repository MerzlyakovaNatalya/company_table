import { fetchCompany } from '@/entities/companies/model/actionCreators'
import { deleteEmployee } from '@/entities/employees/model/actionCreators'
import { deleteEmployeeToSelected } from '@/entities/employees/model/employeesSlice'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks-store'

const useDeleteEmployee = () => {
  const dispatch = useAppDispatch()
  const selectedEmployees = useAppSelector(state => state.employees.selectedEmployeesId)
  const companyId = useAppSelector(state => state.employees.companyId)

  const onClickDelete = () => {
    selectedEmployees.forEach(item => {
      dispatch(deleteEmployee(item))
      dispatch(deleteEmployeeToSelected(item))
      dispatch(fetchCompany(companyId))
    })
  }
  return { onClickDelete }
}

export default useDeleteEmployee
