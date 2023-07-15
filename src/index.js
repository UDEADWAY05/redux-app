import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
    taskComplited,
    titleChange,
    taskDelited,
    loadTasks,
    getTasks,
    getTasksLoadingStatus,
    createdTask
} from './store/task';
import configureStore from './store/store';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { getError } from './store/errors';

const store = configureStore()

const App = () => {
    const state = useSelector(getTasks())
    const isLoading = useSelector(getTasksLoadingStatus())
    const error = useSelector(getError())
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadTasks())
    }, [])   
    const changeTitle = (taskid) => {
         dispatch(titleChange(taskid))
    }
    const delitedTask = (taskid) => {
        dispatch(taskDelited(taskid))
    }
    if (isLoading) {
        return <h1>Loading...</h1>
    }
    if (error) {
        return <p>{error}</p>
    }
    return <><h1>App</h1>
    <button onClick={() => dispatch(createdTask()) }>createPost</button>
    <ul>
        {state.map((el) => {
            return <li key={el.id}>
                <p>{el.title}</p>
                <p>{"Complited:" + el.completed}</p>
                <button onClick={() => dispatch(taskComplited(el.id))}>
                    completed
                </button>
                <button onClick={() => changeTitle(el.id)}>Change Title</button>
                <button onClick={() => delitedTask(el.id)}>delite</button>
                <hr />
            </li>
        }, [])}
    </ul>
    </>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);

