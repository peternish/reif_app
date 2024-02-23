import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { setAlert } from "../store/StatusSlice";

export default function AlertMessage() {
    const dispatch = useDispatch()
    const message = useSelector(state => state.status.alert.message)
    const type = useSelector(state => state.status.alert.type)
    useEffect(() => {
        setTimeout(() => {
            dispatch(setAlert({
                show: false,
                type: null,
                message: null
            }))
        }, 3000)
    }, [])
    return (
        <div className="fixed top-4 right-4" style={{ zIndex: 10000 }}>
            <div
                className={`p-4 rounded-lg shadow-md ${type ? 'bg-green-50 border border-green-600 text-green-600' : 'bg-red-50 border border-red-600 text-red-600'
                    } flex items-center group-hover:opacity-100`}
            >
                {type ? (
                    <i className="fa-solid fa-check mr-4"></i>
                ) : (
                    <i
                        className="fa-solid fa-xmark mr-4 cursor-pointer"
                        onClick={() => dispatch(setAlert({ show: false, type: null, message: null }))}
                    />
                )}
                <span>{message}</span>
            </div>
        </div>
    )
}