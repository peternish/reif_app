import { createSlice } from "@reduxjs/toolkit";

const StatusSlice = createSlice({
    name: 'status',
    initialState: {
        alert: {
            show: false,
            type: null,
            message: null,
        },
        pageUpdate: false
    },
    reducers: {
        setAlert: (state, action) => {
            const { show, type, message } = action.payload;
            state.alert.show = show;
            state.alert.type = type;
            state.alert.message = message;
        },
        setPageUpdate: (state) => {
            state.pageUpdate = !state.pageUpdate
        }
    }
});

export const {
    setAlert,
    setPageUpdate
} = StatusSlice.actions;

export default StatusSlice.reducer;
