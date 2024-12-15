import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart/useCart";

const Orders = () => {
  const { user } = useContext(AuthContext);
  
  const axiosSecure  = useAxiosSecure();
 const [carts , refetch , isLoading ] = useCart()

  const handleDelete = (order) => {
      axiosSecure.delete(`addtocart?id=${order._id}`)
      .then(res => {
        console.log(res.data);
        if(res.data.deletedCount > 0){
          toast.success("Your product has been successfully deleted");
          refetch();

        }
      })
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

    const sum = carts?.reduce((accu , currentValue) => accu + currentValue.recentPrice * currentValue.quantity , 0);
    
  return (
    <div>
      {carts ? (
        <h1 className="lg:mx-[104px]  mx-4 text-2xl text-green-600 font-semibold mt-3">
          Your Cart
        </h1>
      ) : (
        <></>
      )}
      <div className="mt-4">
        {carts.length ? (
          carts.map((order) => (
            <div className=" overflow-x-auto shadow-md sm:rounded-lg lg:mx-[104px]" key={order?.key}>
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
                    <td className="px-6 py-4">
                      <p
                        className="font-medium text-red-600 dark:text-red-500 hover:underline hover:cursor-pointer"
                        onClick={() => handleDelete(order)}
                      >
                        Remove
                      </p>
                    </td>
                  </tr>
                  
                </tbody>
              </table>
                
            </div>
          ))

          
        ) : (
          <h3 className="text-2xl my-10 font-semibold lg:mx-[104px] mx-4 text-green-600">
            You have not ordered any products yet
          </h3>
        )}
      </div>

      <div className="flex justify-end lg:mr-[17%] mt-2">
     {
     carts?.length &&  <h2 className="text-lg font-semibold lg:mx-[104px]">Total : {sum}</h2>
     }
      </div>

      {carts.length ? (
        <div className="flex lg:mx-0 mx-2 lg:flex-row flex-col">
          <Link to="/checkout">
            <button className="btn bg-green-600 lg:ml-[104px] text-center mt-3 text-white lg:w-[300px] hover:bg-emerald-700 w-full ">
              Proceed to checkout
            </button>
          </Link>
          <Link to="/shopallproducts">
            <button className="btn bg-green-600 lg:ml-[12px] text-center mt-3 text-white lg:w-[300px] hover:bg-emerald-700 mb-[4%] w-full">
              Back to shopping
            </button>
          </Link>
        </div>
      ) : (
        <Link to="/shopallproducts">
          <button className="btn bg-green-600 lg:mx-[104px] text-center mt-3 text-white lg:w-[300px] hover:bg-emerald-700 mb-[4%] w-[342px] mx-2">
            Back to shopping
          </button>
        </Link>
      )}
    </div>
  );
};

export default Orders;
