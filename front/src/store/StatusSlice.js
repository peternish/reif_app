import { createSlice } from "@reduxjs/toolkit";

const StatusSlice = createSlice({
    name: 'status',
    initialState: {
        alert: {
            show: false,
            type: null,
            message: null,
        },
        categoryNodeId: '0',
        categoryNodeLabel: '',
        expenseNodeId: '0'
    },
    reducers: {
        setAlert: (state, action) => {
            const { show, type, message } = action.payload;
            state.alert.show = show;
            state.alert.type = type;
            state.alert.message = message;
        },
        setCategoryNodeId: (state, action) => {
            state.categoryNodeId = action.payload
        },
        setCategoryNodeLabel: (state, action) => {
            state.categoryNodeLabel = action.payload
        },
        setExpenseNodeId: (state, action) => {
            state.expenseNodeId = action.payload
        }
    }
});

export const {
    setAlert,
    setCategoryNodeId,
    setCategoryNodeLabel,
    setExpenseNodeId
} = StatusSlice.actions;

export default StatusSlice.reducer;
