import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IEmployee } from './types'
import {
  addEmployee,
  changeEmployeeName,
  changeEmployeePosition,
  changeEmployeeSurname,
  deleteEmployee,
  fetchEmployees,
} from './actionCreators'

interface State {
  employees: IEmployee[]
  selectedEmployeesId: string[]
  companyId: string
  isLoading: boolean
  error: string
}

const initialState: State = {
  employees: [],
  selectedEmployeesId: [],
  companyId: '',
  isLoading: false,
  error: '',
}

export const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addСompanyId: (state, action: PayloadAction<string>) => {
      state.companyId = ''
      state.companyId = action.payload
    },
    deleteСompanyId: state => {
      state.companyId = ''
    },
    addEmployeeToSelected: (state, action: PayloadAction<string>) => {
      state.selectedEmployeesId.push(action.payload)
    },
    deleteEmployeeToSelected: (state, action: PayloadAction<string>) => {
      state.selectedEmployeesId = state.selectedEmployeesId.filter(id => id !== action.payload)
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchEmployees.pending, state => {
        state.isLoading = true
        state.error = ''
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.employees = action.payload
        state.isLoading = false
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter(company => company.id !== action.payload)
        state.isLoading = false
      })
      .addCase(changeEmployeeName.pending, state => {
        state.isLoading = true
        state.error = ''
      })
      .addCase(changeEmployeeName.fulfilled, (state, action: PayloadAction<IEmployee>) => {
        const employeeIndex = state.employees.findIndex(
          employee => employee.id === action.payload.id,
        )
        if (employeeIndex !== -1) {
          state.employees[employeeIndex] = action.payload
        }
        state.isLoading = false
      })
      .addCase(changeEmployeeSurname.pending, state => {
        state.isLoading = true
        state.error = ''
      })
      .addCase(changeEmployeeSurname.fulfilled, (state, action: PayloadAction<IEmployee>) => {
        const employeeIndex = state.employees.findIndex(
          employee => employee.id === action.payload.id,
        )
        if (employeeIndex !== -1) {
          state.employees[employeeIndex] = action.payload
        }
        state.isLoading = false
      })
      .addCase(changeEmployeePosition.pending, state => {
        state.isLoading = true
        state.error = ''
      })
      .addCase(changeEmployeePosition.fulfilled, (state, action: PayloadAction<IEmployee>) => {
        const employeeIndex = state.employees.findIndex(
          employee => employee.id === action.payload.id,
        )
        if (employeeIndex !== -1) {
          state.employees[employeeIndex] = action.payload
        }
        state.isLoading = false
      })
      .addCase(addEmployee.pending, state => {
        state.isLoading = true
        state.error = ''
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.employees.unshift(action.payload)
        state.isLoading = false
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload
        state.isLoading = false
      })
  },
})

export const { addСompanyId, deleteСompanyId, deleteEmployeeToSelected, addEmployeeToSelected } =
  employeesSlice.actions

export default employeesSlice.reducer

function isError(action: { type: string }) {
  return action.type.endsWith('rejected')
}
