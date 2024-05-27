import { useEffect, useRef, useState } from 'react'
import { ICompany } from '@/entities/companies/model/types'

interface IUseListCompanies {
  list: ICompany[]
  loadMoreItems: () => void
}

interface IUseListCompaniesReturn {
  handleScroll: React.UIEventHandler<HTMLDivElement> | undefined
  listContainerRef: React.LegacyRef<HTMLDivElement> | undefined
}

const useListCompanies = ({ list, loadMoreItems }: IUseListCompanies): IUseListCompaniesReturn => {
  const [isFetching, setIsFetching] = useState(false)
  const listContainerRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    if (listContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listContainerRef.current
      if (scrollHeight - scrollTop === clientHeight && !isFetching) {
        setIsFetching(true)
      }
    }
  }

  useEffect(() => {
    if (isFetching) {
      loadMoreItems()
    }
  }, [isFetching])

  useEffect(() => {
    if (isFetching) {
      setIsFetching(false)
    }
  }, [list])
  return { handleScroll, listContainerRef }
}

export default useListCompanies
