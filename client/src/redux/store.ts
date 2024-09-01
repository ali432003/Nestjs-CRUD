import { configureStore } from '@reduxjs/toolkit';
import managerReducer from "./manager/manager"

export const store = configureStore({
    reducer: managerReducer
})