import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, findById, viewTodo, deleteTodo } from '../Store/TodoSlice'
import axios from 'axios'
import ViewTodo from './ViewTodo'

const initialState = {
    Subject: '',
    Task: ''
}

const AddTodo = (props) => {

    const Task = useSelector(state => state.Todo)
    const [todo, setTodo] = useState(initialState)
    const [status, setStatus] = useState('')
    const [name, setName] = useState('Add')
    const dispatch = useDispatch()
    const [update, setUpdate] = useState(false)

    useEffect(async () => {
        const viewTask = await axios.get('/viewTodo')
        dispatch(viewTodo({ view: viewTask.data.msg }))
    }, [update])

    const onInputChange = (event) => {
        setTodo(prevState => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        })
    }

    const onButtonClick = async () => {
        const addTask = await axios.post('/addTodo', todo)
        setStatus(addTask.data.msg)
        dispatch(addTodo({ todoData: todo }))

        setTodo(initialState)
    }

    const handleRemoveTodo = async (id) => {
        const deleteById = await axios.get(`/deleteTodo/${id}`)
        dispatch(deleteTodo({ id: id }))
    }

    const handleUpdateTodo = async (id) => {
        const updateById = await axios.get(`/updateTodo/${id}`)

        setName('Update')
        for (var data in updateById.data.msg) {
            console.log(updateById.data.msg[data])
            setTodo(prevState => {
                return {
                    ...prevState,
                    [data]: updateById.data.msg[data]
                }
            })
        }
    }

    const onUpdateButtonClick = async () => {
        const updateData = await axios.post('/updateTodo', todo)
        setStatus(updateData.data.msg)
        setTodo(initialState)
        setName('Add')
        setUpdate(!update)
    }

    return <div className="container mt-5" >
        <h3>{name} Todo</h3>
        <div className="row">
            <div className="col-md-5">
                <input type="text" className="form-control" name="Subject" placeholder="Enter Subject" value={todo.Subject} onChange={onInputChange} />
            </div>
            <div className="col-md-5">
                <input type="text" className="form-control" name="Task" placeholder="Enter Task Name" value={todo.Task} onChange={onInputChange} />
            </div>
            <div className='col-md-2'>
                <button className="btn btn-success" onClick={name === "Add" ? onButtonClick : onUpdateButtonClick}>{name} Todo</button>
            </div>

        </div>
        <div className='text-center'>{status}</div>

        <ViewTodo viewTask={Task} handleRemoveTodo={handleRemoveTodo} handleUpdateTodo={handleUpdateTodo} />
    </div>
}

export default AddTodo