import { ADD_TASK } from './Actions/AddTask.js'

let initialState = {
    task: 'No funcione'
}

const RootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASK:
            return {
                ...state,
                task: action.payload
            }
        default:
            return state
    }
}

export default RootReducer;