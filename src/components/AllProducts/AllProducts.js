import React, { useState } from "react";
import AllProductsCard from "./AllProductsCard";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import { BiSearch } from "react-icons/bi";
import useAxiosPublic from "../../hooks/useAxiosPublic/useAxiosPublic";

const getFilteredItems = (query, products) => {
  console.log("products : ", products);
  if (!query) {
    return products;
  }
  return products.filter((product) =>
    product.product_name.toLowerCase().includes(query)
  );
};

const AllProducts = () => {
  const axiosPublic = useAxiosPublic();
  const [query, setQuery] = useState("");

  const { isLoading, data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosPublic('/allProducts');
      
      // console.log("data : " , res?.data);
      return res.data;
    },
  });
  const filteredItems = getFilteredItems(query, products);

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <div className="flex lg:flex-row flex-col justify-between lg:mx-[104px] mt-6">
        <h1 className="lg:text-3xl text-2xl  font-bold text-center lg:my-6 my-2">
          Our Products
        </h1>
        <div className="navbar-center  flex  lg:mt-3">
          <ul className="menu menu-horizontal lg:px-1 lg:pl-10 pl-[20px]">
            <label className="bg-purple-600 px-3 rounded-l-lg lg:h-[45px] h-[40px]">
              <BiSearch className="text-2xl  lg:h-[45px] h-[40px] text-white" />
            </label>
            <input
              type="text"
              name=""
              id=""
              className="border-solid border border-slate-500  text-lg text-black font-semibold rounded-r-lg lg:w-[320px] w-[272px] lg:h-[45px] h-[40px] pl-3 bg-base-100"
              placeholder="Search Products..."
              onChange={(e) => setQuery(e.target.value)}
            />
          </ul>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 grid-cols-1 gap-3 lg:mx-[104px]">
        {filteredItems?.slice(0 , 12).map((product) => (
          <AllProductsCard key={product?._id} product={product}></AllProductsCard>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
