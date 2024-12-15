import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import useAxiosPublic from "./useAxiosPublic/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading/Loading";


const usePagination = (url) => {
    const [itemsPerPage , setItemsPerPage] = useState(10);
    const [currentPage , setCurrentPage] = useState(0);
    
    
    const [count , setCount] = useState(0);
    const axiosPublic = useAxiosPublic();
    axiosPublic('/productsCount')
    .then(res => {
        console.log(res?.data?.count)
        setCount(res?.data?.count)
    })
    
    const {data : datas = [] , isLoading} = useQuery({
            queryKey  : ['products', currentPage, itemsPerPage,  url],
            queryFn : async() => {
                    const res = await axiosPublic(`/${url}?page=${currentPage}&size=${itemsPerPage}`)
                    
                    return res.data
            }
    })
    
    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()]

    const handleItemsPerPage = (e) => {
        const value = parseInt(e.target.value);
        setItemsPerPage(value);
        setCurrentPage(0);
      };
      const handlePrevPage = () => {
        if (currentPage > 0) {
          setCurrentPage(currentPage - 1);
        }
      };
      const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
          setCurrentPage(currentPage + 1);
        }
      };

      if(isLoading){
        return <Loading></Loading>
      }

      console.log("datas :" , datas);
    return  [
            datas,
            handlePrevPage,
            pages,
            currentPage,
            setCurrentPage,
            handleNextPage,
            itemsPerPage,
            handleItemsPerPage,
          ];
   
};

export default usePagination;