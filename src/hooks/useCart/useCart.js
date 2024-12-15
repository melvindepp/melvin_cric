import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../useAxiosSecure';


const useCart = () => {
  const axiosSecure = useAxiosSecure();
    const {user} = useContext(AuthContext);
    
    const {refetch , data: carts = []  , isLoading } = useQuery({
        queryKey: [ "cart" , user?.email ],
        queryFn: async () => {
          
          const res = await axiosSecure.get(`/carts?email=${user?.email}`);
          // console.log("useCart " , res.data);
           return res.data;
        },
      });
    
      return [carts , refetch , isLoading ]
};

export default useCart;