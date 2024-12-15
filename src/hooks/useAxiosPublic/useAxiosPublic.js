import axios from "axios";

const instance = axios.create({
        baseURL : 'https://cricket-shop-server.vercel.app'
})
const useAxiosPublic = () => {
    return instance
};

export default useAxiosPublic;