import React from "react";
import { Link } from "react-router-dom";
const AllProductsCard = ({ product }) => {
  // console.log("product : ", product);
  return (
    <div class="max-w-sm bg-white  border border-gray-200 rounded-lg hover:shadow-xl dark:bg-gray-800 dark:border-gray-700 lg:mx-0 mx-4">
      <Link
        to={`/especipicproduct/${product._id}`}
        className="lg:w-[274px] w-full lg:h-[278px] h-[300px]"
      >
        <img
          class="rounded-t-lg lg:w-[274px] w-full lg:h-[278px] h-[326px] "
          src={product?.img}
          alt=""
        />
      </Link>
      <div class="p-5">
       
          <h5 class="mb-2  text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
            {product?.product_name.slice(0, 40)}
          </h5>
        
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          <label className="text-lg font-semibold">
            Price : ৳{product?.recent_price}
            <del className="ml-2 bg-orange-600 px-2 text-white">
              ৳ {product?.prvious_price}
            </del>
          </label>
        </p>
        <Link
          to={`/especipicproduct/${product._id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium w-full text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <div className="ml-[25%]">
            <p className="text-center inline">Details Product</p>
            <svg
              className="w-3.5 h-3.5 ml-2 inline"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AllProductsCard;
