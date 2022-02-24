import { configureStore } from '@reduxjs/toolkit'
import TodoSlice from './TodoSlice'

const store = configureStore({
    reducer: TodoSlice
})

export default store