import { combineReducers } from '@reduxjs/toolkit'
import companiesReducer from '@/entities/companies/model/companiesSlice'
import employeesReducer from '@/entities/employees/model/employeesSlice'

export const rootReducer = combineReducers({
  companies: companiesReducer,
  employees: employeesReducer,
})