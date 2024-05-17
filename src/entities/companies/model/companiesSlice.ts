import { createSlice } from '@reduxjs/toolkit'
import { ICompany } from './types'
import { fetchCompanies } from './actionCreators'

interface State {
  companies: ICompany[]
  isLoading: boolean
  error: string
}

const initialState: State = {
    companies: [],
    isLoading: false,
    error: ''
}

export const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder
     .addCase(fetchCompanies.pending, (state) => {
       state.isLoading = true
       state.error = ''
     })
     .addCase(fetchCompanies.fulfilled, (state, action) => {
      state.companies = action.payload
      state.isLoading = false
     })
    }
})

// export const { setNews, setFilters, setCurrentNews } = companiesSlice.actions

export default companiesSlice.reducer
