import { configureStore } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'
import persistedReducer from '../redux/user/userSlice'

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
})

export const persistor = persistStore(store)

export default store
