export function createStore(reducer, initialState) {
    let state = initialState
    let listeners = []
    function getState() {
        return state
    }
    function dispatch(action) {
        state = reducer(state, action)
        for (let i = 0; i < listeners.length; i++){
            const listener = listeners[i]
            listener()
        }
    }
    function subscibe(listener) {
        listeners.push(listener)
    }
    return { dispatch, getState, subscibe}
}
