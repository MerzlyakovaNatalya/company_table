import { ICompany } from './types'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchCompanies = createAsyncThunk<ICompany[], { offset: number; limit: number }>(
  'companies/fetchAll',
  async ({ offset, limit }) => {
    const url = `/api/companies?offset=${offset}&limit=${limit}`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Ошибка при запросе к серверу')
    }

    const data = await response.json()
    return data
  },
)

export const fetchCompany = createAsyncThunk<ICompany, string>(
  'companies/fetch',
  async companyId => {
    const url = `/api/company/${companyId}`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Ошибка при запросе к серверу')
    }

    const data = await response.json()
    return data
  },
)

export const deleteCompanies = createAsyncThunk<string, string, { rejectValue: string }>(
  'companies/deleteCompany',
  async function (id, { rejectWithValue }) {
    const response = await fetch(`/api/companies/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      return rejectWithValue('Ошибка при запросе к серверу')
    }

    const data = await response.json()
    return data
  },
)

export const changeCompanyName = createAsyncThunk<
  ICompany,
  { id: string; name: string },
  { rejectValue: string }
>('companies/changeCompanyName', async function ({ id, name }, { rejectWithValue }) {
  const response = await fetch(`/api/companies/${id}/name`, {
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

export const changeCompanyAddress = createAsyncThunk<
  ICompany,
  { id: string; address: string },
  { rejectValue: string }
>('companies/changeCompanyAddress', async function ({ id, address }, { rejectWithValue }) {
  const response = await fetch(`/api/companies/${id}/address`, {
    method: 'PUT',
    body: JSON.stringify({ address }),
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

export const addNewCompany = createAsyncThunk<ICompany, undefined, { rejectValue: string }>(
  'companies/addNewCompany',
  async function (_, { rejectWithValue }) {
    const response = await fetch(`/api/companies`, {
      method: 'POST',
      body: JSON.stringify({ name: '...', address: '...', quantity: 0 }),
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
