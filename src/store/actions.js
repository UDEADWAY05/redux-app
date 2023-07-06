import * as actionTypes from './actionTypes';

export function taskComplited(taskid) {
    return {
        type: actionTypes.taskUpdated,
        payload: {
            id: taskid,
            completed: true
        }
    }
}

export function titleChange(taskid) {
    return {
        type: actionTypes.taskUpdated,
        payload: {
            id: taskid,
            title: `new tilte for ${taskid} `
        }
    }
}

export function taskDelited(taskId) {
    return {
        type: actionTypes.taskDelited,
        payload: {
            id: taskId
        }
    }
}