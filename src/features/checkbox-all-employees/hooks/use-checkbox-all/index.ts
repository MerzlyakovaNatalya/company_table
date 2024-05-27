import { useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks-store'
import { IEmployee } from '@/entities/employees/model/types'
import {
  addEmployeeToSelected,
  deleteEmployeeToSelected,
} from '@/entities/employees/model/employeesSlice'

interface IUseCheckboxAllReturn {
  checkbox: boolean
  chooseAll: () => void
}

const useCheckboxAll = (): IUseCheckboxAllReturn => {
  const [checkbox, setCheckbox] = useState(false)
  const dispatch = useAppDispatch()
  const employees = useAppSelector(state => state.employees.employees)

  const chooseAll = useCallback(() => {
    if (checkbox) {
      employees.forEach((employee: IEmployee) => {
        dispatch(deleteEmployeeToSelected(employee.id))
      })
      setCheckbox(false)
    } else {
      employees.forEach(employee => {
        dispatch(addEmployeeToSelected(employee.id))
      })
      setCheckbox(true)
    }
  }, [checkbox, setCheckbox, employees])

  useEffect(() => {
    if (employees.length < 1) setCheckbox(false)
  }, [employees, checkbox])

  return { checkbox, chooseAll }
}

export default useCheckboxAll
