import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import * as action from './store/actions';
import { initialStore } from './store/store';

const store = initialStore()
console.log(store)

const App = (params) => {
    const [state, setState] = useState(store.getState())
    useEffect(() => {
        store.subscribe(() => {
            setState(store.getState())
        })
    },[])
    const completedTask = (taskid) => { 
        console.log(taskid)
        store.dispatch(action.taskComplited(taskid))
    }
    const changeTitle = (taskid) => {
         store.dispatch(action.titleChange(taskid))
    }
    const delitedTask = (taskid) => {
        store.dispatch(action.taskDelited(taskid))
    }

    return <><h1>App</h1>
    <ul>
        {state.map((el) => {
            return <li key={el.id}>
                <p>{el.title}</p>
                <p>{"Complited:" + el.completed}</p>
                <button onClick={() => completedTask(el.id)}>
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
    <App />
  </React.StrictMode>
);

