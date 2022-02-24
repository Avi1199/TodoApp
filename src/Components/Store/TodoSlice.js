import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Todo: [],
    findTodo: []
}

const TodoSlice = createSlice({
    name: 'Todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.Todo = [...state.Todo, action.payload.todoData]
        },
        viewTodo: (state, action) => {
            state.Todo = action.payload.view
        },
        deleteTodo: (state, action) => {
            state.Todo = state.Todo.filter(data => data._id !== action.payload.id)
        },
        findById: (state, action) => {
            const todoData = state.Todo.find(data => data._id === action.payload.id)
            state.findTodo = todoData
        }
    }
})

export const { addTodo, viewTodo, findById, deleteTodo } = TodoSlice.actions
export default TodoSlice.reducer
