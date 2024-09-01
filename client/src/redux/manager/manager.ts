import { createSlice } from '@reduxjs/toolkit';

interface Manager {
    Mname: String,
    email: String,
    geneder: "Male" | "Female" | "",
    Employees: object[]
}
const initialState: Manager = {
    Mname: "",
    email: "",
    geneder: "",
    Employees: []
}

export const managerSlice = createSlice({
    name: 'manager',
    initialState,
    reducers: {
        login: (state, action) => {
            state.Mname = action.payload.Mname
            state.email = action.payload.email
            state.geneder = action.payload.gender
            state.Employees = action.payload.Employees
        },
        logout: (state, action) => {
            state.Mname = ""
            state.email = ""
            state.geneder = ""
            state.Employees = []
        },
    }
})

export const { login, logout } = managerSlice.actions

export default managerSlice.reducer