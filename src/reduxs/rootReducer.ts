import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './auths/auth.reducers';

const rootReducer = combineReducers({
    auth: authReducer
})

export default rootReducer;