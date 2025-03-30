// userSlice.js
import { createSlice, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

// User Slice
const initialUserState = {
  username: '',
  email: '',
  role: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setUser: (state, action) => {
      const { username, email, role } = action.payload
      state.username = username
      state.email = email
      state.role = role
    },
    clearUser: (state) => {
      state.username = ''
      state.email = ''
      state.role = ''
    },
  },
})

export const { setUser, clearUser } = userSlice.actions

// Root Reducer with Reset
const appReducer = combineReducers({
  user: userSlice.reducer,
})

const rootReducer = (state, action) => {
  if (action.type === 'user/clearUser') {
    state = undefined
  }
  return appReducer(state, action)
}

// Persist Configuration
const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer
