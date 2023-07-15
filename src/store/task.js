import { createSlice } from "@reduxjs/toolkit"
import todosService from "../services/todos.services";
import { setError } from "./errors";

const initialState = {entities: [], isLoading: true, };

const taskSlice = createSlice({
    name: "task", initialState, reducers: {
        resived(state, action) {
            state.entities = action.payload
            state.isLoading = false
        },
        update(state, action) {
            const elementIndex = state.entities.findIndex(el => el.id === action.payload.id)
            state.entities[elementIndex] = { ...state.entities[elementIndex], ...action.payload }
        },
        remove(state, action) {
            console.log(action.payload.id)
            state.entities = state.entities.filter(el => el.id !== action.payload.id)
        },
        create(state, action) {
            state.entities = [ action.payload, ...state.entities ]
        },
        taskRequested(state, action) {
            state.isLoading = true;
        }, taskRequestedFailed(state, action) {
            state.isLoading = false;
        },

    }
})

const { actions, reducer: taskReducer } = taskSlice
const { update, remove, resived, taskRequested, taskRequestedFailed, create } = actions

export const loadTasks = () => async (dispatch) => {
    dispatch(taskRequested())
    try {
        const data = await todosService.fetch()
        dispatch(resived(data))
    } catch (error) {
        dispatch(taskRequestedFailed(error.message))
        dispatch(setError(error.message))
    }
}

export const createdTask = () => async (dispatch, getState) => {
    try {
        const data = await todosService.create()
        // console.log(data)
        dispatch(create(data))
    } catch (error) {

    }
}

export const taskComplited = (id) => (dispatch, getState) => {
    dispatch(update({ id, completed: true }));
};

export function titleChange(taskid) {
    return update({
        id: taskid,
        title: `new tilte for ${taskid} `
    });
}

export function taskDelited(taskId) {
    return remove({
        id: taskId
    })
}

export const getTasks = () => (state) => state.tasks.entities

export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading

export default taskReducer