import { combineReducers, configureStore, } from '@reduxjs/toolkit'
import { setupListeners, } from '@reduxjs/toolkit/query'

import { labelApi, labelReducers, } from '@/redux/label'
import { useDispatch, } from 'react-redux'

const store = configureStore({
  reducer: combineReducers({
    [labelApi.reducerPath]: labelApi.reducer,
    labelReducers,
  }),

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(labelApi.middleware),
})

setupListeners(store.dispatch)

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
