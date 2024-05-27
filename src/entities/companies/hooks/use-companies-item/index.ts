import React, { useCallback, useEffect, useState } from 'react'
import { ICompany } from '../../model/types'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks-store'
import { addCompanyToSelected, deleteCompanyToSelected } from '../../model/companiesSlice'
import { addСompanyId, deleteСompanyId } from '@/entities/employees/model/employeesSlice'
import { fetchEmployees } from '@/entities/employees/model/actionCreators'
import useDebounce from '@/shared/hooks/use-debounce'
import { changeCompanyAddress, changeCompanyName } from '../../model/actionCreators'

interface ICompaniesItem {
  item: ICompany
  onOpen: React.Dispatch<React.SetStateAction<boolean>>
}

interface IUseCompaniesItemReturn {
  selected: boolean
  toggleCheckbox: boolean
  onCheckbox: () => void
  onCangeName: (value: string) => void
  onCangeAddress: (value: string) => void
}

const useCompaniesItem = ({ item, onOpen }: ICompaniesItem): IUseCompaniesItemReturn => {
  const [toggleCheckbox, setToggleCheckbox] = useState(false)
  const [selected, setSelected] = useState(false)

  const selectedCompaniesId = useAppSelector(state => state.companies.selectedCompaniesId)
  const companyId = useAppSelector(state => state.employees.companyId)

  const dispatch = useAppDispatch()

  const onCheckbox = useCallback(() => {
    const hasId = selectedCompaniesId.includes(item.id)
    if (hasId) {
      dispatch(deleteCompanyToSelected(item.id))
      dispatch(deleteСompanyId())
      onOpen(false)
    } else {
      dispatch(fetchEmployees({ id: item.id }))
      dispatch(addCompanyToSelected(item.id))
      dispatch(addСompanyId(item.id))
      onOpen(false)
      setSelected(!selected)
    }
  }, [setSelected, selected, onOpen, selectedCompaniesId])

  const onCangeName = useCallback(
    useDebounce(name => {
      dispatch(changeCompanyName({ id: item.id, name }))
    }, 600),
    [],
  )

  const onCangeAddress = useCallback(
    useDebounce(address => {
      dispatch(changeCompanyAddress({ id: item.id, address }))
    }, 600),
    [],
  )
  useEffect(() => {
    if (item.id === companyId) {
      setSelected(true)
      onOpen(true)
    } else {
      setSelected(false)
    }
  }, [companyId])

  useEffect(() => {
    const hasId = selectedCompaniesId.includes(item.id)
    if (hasId) {
      setToggleCheckbox(true)
    } else {
      setToggleCheckbox(false)
    }
  }, [selectedCompaniesId])

  return { selected, toggleCheckbox, onCheckbox, onCangeName, onCangeAddress }
}

export default useCompaniesItem
