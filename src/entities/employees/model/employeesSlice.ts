import { createSlice } from '@reduxjs/toolkit'
import { IEmployee } from './types'

interface State {
  employees: IEmployee[]
  isLoading: boolean
  error: string
}

const initialState: State = {
  employees: [],
  isLoading: false,
  error: '',
}

export const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
})

// export const { setNews, setFilters, setCurrentNews } = companiesSlice.actions

export default employeesSlice.reducer
