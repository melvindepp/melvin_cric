import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Shipping from "../ShippingHomeSection3/Shipping";

// swiper carousel


import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import required modules
import { Zoom, Navigation, Pagination } from 'swiper/modules';
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import useCart from "../../hooks/useCart/useCart";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {useNavigate} from 'react-router-dom';
import Review from "./Review/Review";

const DetailsProducts = () => {
  const { user } = useContext(AuthContext);
  const [value, setValue] = useState(1);
  const axiosSecure = useAxiosSecure();
  const {id} = useParams();
  const [ , refetch] = useCart();
  const [disabled , setDisabled] = useState(false);
  const navigate = useNavigate()
  
  const {data : data , isLoading } = useQuery({
    queryKey : ['product'],
    queryFn : async()=> {
          const res = await axiosSecure(`/especipicproduct/${id}`);
            console.log("res.data" , res.data)

          return res.data
    }
  })
  if(isLoading){
    return <Loading></Loading>
  }

  const plus = () => {
    const valueOfPlus = value + 1;
    setValue(valueOfPlus);
  };

  const minus = () => {
    const valueOfMinus = value - 1;
    setValue(valueOfMinus);
  };

  const handleProduct = () => {
    const userInfo = {
      userName: user?.displayName,
      email: user?.email,
    };

    const cartItem = {
      image: data?.img,
      productName: data?.product_name,
      quantity: value,
      recentPrice: data?.recent_price,
      previousPrice: data?.prvious_price,
      userName: userInfo.userName,
      email: userInfo.email,
    };

    // const totalPrice = info.quantity * info.recentPrice;
    // setTotal(totalPrice);
    // console.log("information : ", cartItem);
    axiosSecure.post('/carts' , cartItem)
    .then(res => {
      console.log(res.data)
      if(res.data.insertedId){
        toast.success("add to cart successful");
        refetch();
        setDisabled(true);
        navigate('/orders')
      }
    })
    .catch((error) => {
      toast.error(error.message)
    })
  };

  return (
    
    <>
      <div className="card card-side bg-base-100  lg:mx-[90px] mt-10 flex lg:flex-row flex-col">
        

        <div>
        <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        zoom={true}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Zoom, Navigation, Pagination]}
        className="mySwiper lg:w-[650px] lg:h-[550px]"
      >
        <SwiperSlide className="lg:w-[650px] lg:h-[550px] border border-solid-2 border-purple-600 rounded-none">
          <div className="swiper-zoom-container border-solid-2 border-purple-600 rounded-none  lg:w-full lg:h-full">
            <img src={data?.img}  className="lg:w-full lg:h-full" />
          </div>
        </SwiperSlide>
        
       
        
      </Swiper>

        </div>
        <div className=" lg:ml-10 ml-4 lg:w-[425px] lg:mt-0 mt-4">
          <h2 className="card-title lg:text-3xl text-xl font-bold">
            {data?.product_name}
          </h2>
          <div className="flex mt-3">
            <del className="bg-orange-600 px-3  text-white lg:text-2xl text-xl">
              ৳{data?.prvious_price}
            </del>
            <h3 className="lg:text-2xl text-xl font-semibold ml-3">
              ৳{data?.recent_price}
            </h3>
          </div>

          <div>
            <div className="flex mt-3">
              <div className="lg:w-[85px]   mr-[35px] flex lg:mt-2 mt-2">
                <label
                  className=" bg-white border border-solid border-black px-3 text-lg font-semibold hover:bg-orange-500 hover:text-white hover:cursor-pointer h-[30px] "
                  onClick={() => plus()}
                >
                  +
                </label>
                <p className="mx-3">{value}</p>
                <label
                  className=" bg-white border border-solid border-black px-3 text-lg font-semibold hover:bg-orange-500 hover:text-white hover:cursor-pointer h-[30px]"
                  onClick={() => minus()}
                >
                  -
                </label>
              </div>

              {user ? (
                disabled ? <button
                className="btn hover:bg-orange-700 lg:w-[320px] w-[195px] bg-orange-600 text-white "
                onClick={() => handleProduct()}disabled
              >
                Add To Cart
              </button>
              :

                <button
                  className="btn hover:bg-orange-700 lg:w-[320px] w-[195px] bg-orange-600 text-white "
                  onClick={() => handleProduct()}
                >
                  Add To Cart
                </button>
              ) : (
                <Link to="/login">
                  <button className="btn hover:bg-orange-700 lg:w-[320px] bg-orange-600 text-white w-[195px]">
                    Add To Cart
                  </button>
                </Link>
              )}
            </div>
            {user ? (
              <Link to={`/checkoutBuy/${id}`}>
                <button className="btn hover:bg-orange-700  lg:w-[440px] w-[335px] bg-orange-600 text-white mt-3 lg:mr-0 mr-4">
                  Buy Now
                </button>
              </Link>
            ) : (
              <Link to="/login">
                <button className="btn hover:bg-orange-700  lg:w-[440px] bg-orange-600 text-white mt-3 w-full lg:mr-0 mr-4">
                  Buy Now
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>


      {/* Review */}
      <Review id={id}></Review>

      <Shipping></Shipping>
    </>
  );
};

export default DetailsProducts;
