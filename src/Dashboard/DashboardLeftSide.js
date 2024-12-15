import React from 'react';
import {  NavLink } from 'react-router-dom';
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { MdSportsCricket } from "react-icons/md";

const DashboardLeftSide = () => {
    return (
        <div className="bg-[#2C4E80] text-white lg:h-screen">
            {/* normal user */}
            <ul className="menu  w-full p-0 [&_li>*]:rounded-none pt-4">
                <li className="text-lg hover:text-white font-semibold mb-2"><NavLink to="/dashboard/myOrders"><MdOutlineShoppingCart className="text-xl font-bold" />My Orders</NavLink></li>
                <hr/>

                <li className="text-lg hover:text-white font-semibold mt-2"><NavLink to="/"><FaHome className="text-xl font-bold" />Home</NavLink></li>
                <li className="text-lg hover:text-white font-semibold mt-2"><NavLink to="/shopallproducts"><MdSportsCricket className="text-xl font-bold" />Shop (All Products)</NavLink></li>
            </ul>
        </div>
    );
};

export default DashboardLeftSide;