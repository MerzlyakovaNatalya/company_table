import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks-store'
import { IEmployee } from '../../model/types'
import { useCallback, useEffect, useState } from 'react'
import { addEmployeeToSelected, deleteEmployeeToSelected } from '../../model/employeesSlice'
import useDebounce from '@/shared/hooks/use-debounce'
import {
  changeEmployeeName,
  changeEmployeePosition,
  changeEmployeeSurname,
} from '../../model/actionCreators'

interface IEmployeesItem {
  item: IEmployee
}

interface IUseEmployeesItemReturn {
  toggleCheckbox: boolean
  onCheckbox: () => void
  onCangeName: (value: string) => void
  onCangeSurname: (value: string) => void
  onCangePosition: (value: string) => void
}

const useEmployeesItem = ({ item }: IEmployeesItem): IUseEmployeesItemReturn => {
  const dispatch = useAppDispatch()
  const [toggleCheckbox, setToggleCheckbox] = useState(false)

  const selectedEmployeesId = useAppSelector(state => state.employees.selectedEmployeesId)

  const onCheckbox = useCallback(() => {
    const hasId = selectedEmployeesId.includes(item.id)
    if (hasId) {
      dispatch(deleteEmployeeToSelected(item.id))
    } else {
      dispatch(addEmployeeToSelected(item.id))
    }
  }, [])

  const onCangeName = useCallback(
    useDebounce(name => {
      dispatch(changeEmployeeName({ id: item.id, name }))
    }, 600),
    [],
  )

  const onCangeSurname = useCallback(
    useDebounce(surname => {
      dispatch(changeEmployeeSurname({ id: item.id, surname }))
    }, 600),
    [],
  )

  const onCangePosition = useCallback(
    useDebounce(position => {
      dispatch(changeEmployeePosition({ id: item.id, position }))
    }, 600),
    [],
  )

  useEffect(() => {
    const hasId = selectedEmployeesId.includes(item.id)
    if (hasId) {
      setToggleCheckbox(true)
    } else {
      setToggleCheckbox(false)
    }
  }, [selectedEmployeesId])
  
  return { toggleCheckbox, onCheckbox, onCangeName, onCangeSurname, onCangePosition }
}

export default useEmployeesItem
