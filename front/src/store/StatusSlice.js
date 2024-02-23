import { createSlice } from "@reduxjs/toolkit";

const StatusSlice = createSlice({
    name: 'status',
    initialState: {
        alert: {
            show: false,
            type: null,
            message: null,
        }
    },
    reducers: {
        setAlert: (state, action) => {
            const { show, type, message } = action.payload;
            state.alert.show = show;
            state.alert.type = type;
            state.alert.message = message;
        }
    }
});

export const { setAlert } = StatusSlice.actions;

export default StatusSlice.reducer;
