import { useEffect } from "react";
import { setAlert } from "../store/StatusSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function useErrorHandler() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (err) => {
        if (err.response) {
            let type = false;
            if (err.response.status === 401) {
                navigate('/login');
            }
            if (err.response.status < 300) {
                type = true;
            }
            dispatch(setAlert({
                show: true,
                type: type,
                message: err.response.data.message // Assuming message is in data
            }));
        }
    }
}
