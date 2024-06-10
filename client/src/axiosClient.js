import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((req) => {
    const token = localStorage.getItem("ACCESS_TOKEN");

    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        try {
            const { response } = error;

            const token = localStorage.getItem("ACCESS_TOKEN");

            if (token && response.status === 401) {
                localStorage.removeItem("ACCESS_TOKEN");
            }
        } catch (err) {
            console.log(err);
        }

        throw error;
    }
);
export default axiosClient;
