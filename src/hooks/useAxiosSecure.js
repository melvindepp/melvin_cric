import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import {  useNavigate } from "react-router-dom";



 const axiosSecure = axios.create({
        baseURL : 'https://cricket-shop-server.vercel.app'
})
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    
        axiosSecure.interceptors.request.use(
                function(config){
                        const token = localStorage.getItem('access-token');
                        console.log("token vai koi : " , token)
                        config.headers.authorization = `Bearer ${token}`;
                        return config
                },
                function(error){
                        return Promise.reject(error);
                }
            );
            
                axiosSecure.interceptors.response.use(
                        function(response){
                            return response
                        },
            
                        function(error){
                                // console.log("error" , error)
                                
                                const status = error?.response?.status;
                                console.log("status" , status);
                                if(status === 401 || status === 403){
                                    console.log("statuss " , status);
                        //     TODO : এখানে একটু সমস্যা আছে সমাধান করা বাকি।
                                //     await logout()
                                //     navigate('/login')
                               
                                        
                                }
                                return Promise.reject(error);
                        }
                );
            
        
           
  
    return axiosSecure;
};

export default useAxiosSecure;