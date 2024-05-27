import { useCallback, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks-store'
import { fetchCompanies } from '@/entities/companies/model/actionCreators'
import { ICompany } from '@/entities/companies/model/types'
import { IEmployee } from '@/entities/employees/model/types'

interface IUseCompaniesItemReturn {
  companies: ICompany[]
  employees: IEmployee[]
  isOpen: boolean
  getLoadMoreItems: () => void
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const useTables = (): IUseCompaniesItemReturn => {
  const [isOpen, setIsOpen] = useState(false)
  const offsetRef = useRef<number>(0)
  const dispatch = useAppDispatch()

  const companies = useAppSelector(state => state.companies.companies)
  const employees = useAppSelector(state => state.employees.employees)
  const companiesId = useAppSelector(state => state.employees.companyId)

  const limit = 50

  const getLoadMoreItems = useCallback(() => {
    dispatch(fetchCompanies({ offset: offsetRef.current, limit }))
    offsetRef.current += limit
  }, [dispatch])

  useEffect(() => {
    if (companiesId === '') {
      setIsOpen(false)
    }
  }, [companiesId])

  useEffect(() => {
    if (!offsetRef.current) offsetRef.current = 0
    dispatch(fetchCompanies({ offset: offsetRef.current, limit }))
    offsetRef.current += limit
  }, [dispatch])

  return {
    companies,
    employees,
    isOpen,
    getLoadMoreItems,
    setIsOpen,
  }
}

export default useTables
