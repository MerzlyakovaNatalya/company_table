import { IEmployee } from './types'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchEmployees = createAsyncThunk<IEmployee[], { id: string }>(
  'employees/fetchAll',
  async ({ id }, thunkAPI) => {
    try {
      const url = `/api/employees?companyid=${id}`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error('Ошибка при запросе к серверу')
      }

      const data = await response.json()
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue('Не удалось загрузить сотрудников')
    }
  },
)

export const deleteEmployee = createAsyncThunk<string, string, { rejectValue: string }>(
  'employees/deleteEmployee',
  async function (id, { rejectWithValue }) {
    const response = await fetch(`/api/employees/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      return rejectWithValue('Ошибка при запросе к серверу')
    }

    const data = await response.json()
    return data
  },
)

export const addEmployee = createAsyncThunk<IEmployee, string, { rejectValue: string }>(
  'employees/addEmployee',
  async function (id, { rejectWithValue }) {
    const response = await fetch(`/api/companies/${id}/employees`, {
      method: 'POST',
      body: JSON.stringify({
        name: '...',
        surname: '...',
        position: '...',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      return rejectWithValue('Ошибка при запросе к серверу')
    }

    const data = await response.json()
    return data
  },
)

export const changeEmployeeName = createAsyncThunk<
  IEmployee,
  { id: string; name: string },
  { rejectValue: string }
>('employees/changeEmployeeName', async function ({ id, name }, { rejectWithValue }) {
  const response = await fetch(`/api/employees/${id}/name`, {
    method: 'PUT',
    body: JSON.stringify({ name }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    return rejectWithValue('Ошибка при запросе к серверу')
  }

  const data = await response.json()
  return data
})

export const changeEmployeeSurname = createAsyncThunk<
  IEmployee,
  { id: string; surname: string },
  { rejectValue: string }
>('employees/changeEmployeeSurname', async function ({ id, surname }, { rejectWithValue }) {
  const response = await fetch(`/api/employees/${id}/surname`, {
    method: 'PUT',
    body: JSON.stringify({ surname }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    return rejectWithValue('Ошибка при запросе к серверу')
  }

  const data = await response.json()
  return data
})

export const changeEmployeePosition = createAsyncThunk<
  IEmployee,
  { id: string; position: string },
  { rejectValue: string }
>('employees/changeEmployeePosition', async function ({ id, position }, { rejectWithValue }) {
  const response = await fetch(`/api/employees/${id}/position`, {
    method: 'PUT',
    body: JSON.stringify({ position }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    return rejectWithValue('Ошибка при запросе к серверу')
  }

  const data = await response.json()
  return data
})
