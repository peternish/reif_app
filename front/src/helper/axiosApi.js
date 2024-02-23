import axios from 'axios'

export default function Axios() {
    axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
    const token = localStorage.getItem('authToken')
    if (token) {
        axios.defaults.headers.common['Authorization'] = auth.user.token;
    }
    return axios
}