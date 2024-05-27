import { useCallback, useEffect, useState } from 'react'
import { ICompany } from '@/entities/companies/model/types'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks-store'
import {
  addCompanyToSelected,
  clearSelected,
  deleteCompanyToSelected,
} from '@/entities/companies/model/companiesSlice'

interface IUseCheckboxAllReturn {
  checkbox: boolean
  chooseAll: () => void
}

const useCheckboxAll = (): IUseCheckboxAllReturn => {
  const [checkbox, setCheckbox] = useState(false)
  const dispatch = useAppDispatch()
  const companies = useAppSelector(state => state.companies.companies)

  const chooseAll = useCallback(() => {
    if (checkbox) {
      companies.forEach((company: ICompany) => {
        dispatch(deleteCompanyToSelected(company.id))
      })
      setCheckbox(false)
    } else {
      dispatch(clearSelected())
      companies.forEach(company => {
        dispatch(addCompanyToSelected(company.id))
      })
      setCheckbox(true)
    }
  }, [checkbox, setCheckbox, companies])

  useEffect(() => {
    if (companies.length < 1) setCheckbox(false)
  }, [companies, checkbox])

  return { checkbox, chooseAll }
}

export default useCheckboxAll
