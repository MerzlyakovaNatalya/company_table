import { useCallback } from 'react'
import { IEmployee } from '@/entities/employees/model/types'
import { ICompany } from '@/entities/companies/model/types'
import Layout from '@/widgets/layouts/ui/layout'
import SideLayout from '@/widgets/layouts/ui/side-layout'
import HeaderCompanies from '@/widgets/companies/ui/header'
import ListCompanies from '@/widgets/companies/ui/list'
import HeaderEmployees from '@/widgets/employees/ui/header'
import ListEmployees from '@/widgets/employees/ui/list'
import CompaniesItem from '@/entities/companies/ui/item'
import EmployeesItem from '@/entities/employees/ui/item'
import useTables from '../../hooks/use-tables'

const Tables = () => {
  const { companies, employees, isOpen, getLoadMoreItems, setIsOpen } = useTables()

  const renders = {
    itemCompanies: useCallback(
      (item: ICompany) => <CompaniesItem item={item} onOpen={setIsOpen} />,
      [companies],
    ),
    itemEmployees: useCallback((item: IEmployee) => <EmployeesItem item={item} />, []),
  }

  return (
    <SideLayout padding="medium">
      <Layout head={<HeaderCompanies />}>
        <ListCompanies
          list={companies}
          renderItem={renders.itemCompanies}
          loadMoreItems={getLoadMoreItems}
        />
      </Layout>
      {isOpen && (
        <Layout head={<HeaderEmployees />}>
          <ListEmployees list={employees} renderItem={renders.itemEmployees} />
        </Layout>
      )}
    </SideLayout>
  )
}

export default Tables
