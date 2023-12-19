import { fetchBaseQuery, } from '@reduxjs/toolkit/query/react'

// export const baseUrl = 'http://192.168.31.194:5174'
export const baseUrl = 'http://localhost:5174'

export const useFetchBaseQuery = () => fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    headers.set('token', '0')
    return headers
  },
})
