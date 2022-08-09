import { createWrapper } from 'next-redux-wrapper'
import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducer'

const makeStore = () => configureStore({
  reducer,
  devTools: process.env.NODE_ENV === 'development'
})

const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV === 'development',
})

export default wrapper