import { createApi, } from '@reduxjs/toolkit/query/react'
import { baseUrl, useFetchBaseQuery, } from '@/redux/rtk-query-config'
import { createSlice, } from '@reduxjs/toolkit'
import type { PayloadAction, } from '@reduxjs/toolkit'
import { fetchBaseQuery, } from '@reduxjs/toolkit/dist/query/react'

export const labelApi_ = createApi({
  reducerPath: 'labelApi',
  // baseQuery: useFetchBaseQuery(),
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set('token', '0')
      return headers
    },
  }),
  endpoints: (builder) => ({
    getAllLabel: builder.query({
      query: () => '/getAllLabelByUser',
    }),
  }),
})

export const labelSlice = createSlice({
  name: 'label',
  initialState: {
    customLabelList: [] as any[],
  },
  reducers: {
    setLabelList (state, action: PayloadAction<Array<any>>) {
      state.customLabelList = action.payload
    },
  },
})

export const { useGetAllLabelQuery, } = labelApi_
export const labelReducers = labelSlice.reducer

export const labelApi = labelApi_

export const labelAction = labelSlice.actions
