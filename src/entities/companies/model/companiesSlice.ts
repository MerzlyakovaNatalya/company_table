import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ICompany } from './types'
import {
  addNewCompany,
  changeCompanyAddress,
  changeCompanyName,
  deleteCompanies,
  fetchCompanies,
  fetchCompany,
} from './actionCreators'

interface State {
  companies: ICompany[]
  selectedCompaniesId: string[]
  isLoading: boolean
  error: string
}

const initialState: State = {
  companies: [],
  selectedCompaniesId: [],
  isLoading: false,
  error: '',
}

export const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    addCompanyToSelected: (state, action: PayloadAction<string>) => {
      state.selectedCompaniesId.push(action.payload)
    },
    deleteCompanyToSelected: (state, action: PayloadAction<string>) => {
      state.selectedCompaniesId = state.selectedCompaniesId.filter(id => id !== action.payload)
    },
    clearSelected: state => {
      state.selectedCompaniesId = []
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCompanies.pending, state => {
        state.isLoading = true
        state.error = ''
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.companies.push(...action.payload)
        state.isLoading = false
      })
      .addCase(fetchCompany.pending, state => {
        state.isLoading = true
        state.error = ''
      })
      .addCase(fetchCompany.fulfilled, (state, action) => {
        const companyIndex = state.companies.findIndex(company => company.id === action.payload.id)
        if (companyIndex !== -1) {
          state.companies[companyIndex] = action.payload
        }
        state.isLoading = false
      })
      .addCase(deleteCompanies.pending, state => {
        state.isLoading = true
        state.error = ''
      })
      .addCase(deleteCompanies.fulfilled, (state, action) => {
        state.companies = state.companies.filter(company => company.id !== action.payload)
        state.isLoading = false
      })
      .addCase(changeCompanyName.pending, state => {
        state.isLoading = true
        state.error = ''
      })
      .addCase(changeCompanyName.fulfilled, (state, action) => {
        const companyIndex = state.companies.findIndex(company => company.id === action.payload.id)
        if (companyIndex !== -1) {
          state.companies[companyIndex] = action.payload
        }
        state.isLoading = false
      })
      .addCase(changeCompanyAddress.pending, state => {
        state.isLoading = true
        state.error = ''
      })
      .addCase(changeCompanyAddress.fulfilled, (state, action) => {
        const companyIndex = state.companies.findIndex(company => company.id === action.payload.id)
        if (companyIndex !== -1) {
          state.companies[companyIndex] = action.payload
        }
        state.isLoading = false
      })
      .addCase(addNewCompany.pending, state => {
        state.isLoading = true
        state.error = ''
      })
      .addCase(addNewCompany.fulfilled, (state, action) => {
        state.companies.unshift(action.payload)
        state.isLoading = false
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload
        state.isLoading = false
      })
  },
})

export const { addCompanyToSelected, deleteCompanyToSelected, clearSelected } =
  companiesSlice.actions

export default companiesSlice.reducer

function isError(action: { type: string }) {
  return action.type.endsWith('rejected')
}
