import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Loading from "../components/Loading/Loading";
import { ImCross } from "react-icons/im";
import {Link} from 'react-router-dom';

const MyOrders = () => {
    const axiosPublic = useAxiosPublic();
    const {user} = useContext(AuthContext);

    const {data : myOrders , refetch , isLoading } = useQuery({
        queryKey : ['myOrders' , user?.email],
        queryFn : async() => {
            const res = await axiosPublic.get(`/confirmorder?email=${user?.email}`);
            // const orders = await res?.data.map(order => order.carts)
           console.log("myorders " , res.data);
            return res.data

        }
    })
    const handleDelete = (id) => {
      // TODO : delete kora baki ache
      axiosPublic.delete(`/confirmorder?id=${id}`)
      .then(res => {
        console.log(res.data);
        if(res.data.deletedCount > 0){
          refetch();

        }
      })
  };

    if(isLoading){
        return <div className="flex justify-center items-center h-screen">
            <span className="loading loading-dots w-16 h-16  text-red-500"></span>
        </div>
    }
    return (
        <div className="px-2 lg:px-10 mt-4">
            {myOrders?.length > 0 && <h2 className="text-2xl font-bold mb-3">My orders</h2>}


            {/* orders */}
           <div>
           {
               myOrders.length > 0 ?  myOrders?.map(order => (<div className=" overflow-x-auto shadow-md sm:rounded-lg" key={order?.key}>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="w-[96px] h-[96px] p-4 rounded-full">
                        <div className="lg:w-[64px] w-[64px] lg:h-[64px] h-[64px]">
                          <img
                            src={order?.image}
                            alt="Apple Watch"
                            className="rounded-full lg:w-[64px] w-[64px] lg:h-[64px] h-[64px] "
                          />
                        </div>
                      </td>
  
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white lg:w-[490px] w-[220px]">
                        <p className="lg:w-[490px] w-[220px]">
                          {order?.productName}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          {order.quantity}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {order?.recentPrice}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {order?.recentPrice * order?.quantity}
                      </td>
                      {/* <td className="px-6 py-4">
                        <p
                          className="font-medium text-red-600 dark:text-red-500 hover:underline hover:cursor-pointer"
                          onClick={() => handleDelete(order?._id)}
                        >
                          Cancel Order
                        </p>
                      </td> */}
                    </tr>
                    
                  </tbody>
                </table>
                  
              </div>))
              :
              <div className="w-full h-screen flex justify-center items-center">
               <div>
               <h2 className="text-2xl font-bold text-green-600 text-center">There is no orders here</h2>
                <ImCross className="text-red-600 text-3xl font-semibold mx-auto my-2"/>
                <Link to="/shopallproducts">
                <button className="btn bg-green-600  text-center mt-3 text-white lg:w-[300px] hover:bg-emerald-700  w-full">
                  Back to shopping
                </button>
              </Link>
               </div>
              </div>
            }
           </div>

        </div>
    );
};

export default MyOrders;