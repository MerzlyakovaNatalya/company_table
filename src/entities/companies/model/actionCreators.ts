import { AppDispatch } from '@/app/appStore'
import { ICompany } from './types'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchCompanies = createAsyncThunk<ICompany[], { offset: number; limit: number }>(
  'companies/fetchAll',
  async ({ offset, limit }, thunkAPI) => {
    try {
      const url = `/api/companies?offset=${offset}&limit=${limit}`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error('Ошибка при запросе к серверу')
      }

      const data = await response.json()
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue('Не удалось загрузить компании')
    }
  },
)
