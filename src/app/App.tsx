import React, { useEffect } from 'react'
import style from './styles.module.scss'
import { useAppDispatch } from './appStore'
import { fetchCompanies } from '@/entities/companies/model/actionCreators'

const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchCompanies({ offset: 0, limit: 10 }))
  }, [])

  return <div>App</div>
}

export default App
