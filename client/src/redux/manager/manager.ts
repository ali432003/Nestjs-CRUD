import { createSlice } from '@reduxjs/toolkit';


const initialState : any = {
    manager: {}

}

export const managerSlice = createSlice({
    name: 'manager',
    initialState,
    reducers: {
        login: (state, action) => {
            state.manager = { ...action.payload, }
        },
        logout: (state, action) => {
           state.manager = null
        },
    }
})

export const { login, logout } = managerSlice.actions

export default managerSlice.reducer