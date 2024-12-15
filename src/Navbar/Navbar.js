import React, { useContext, useState } from "react";
import "../App.css";
import { FaFacebook } from "react-icons/fa";
import { MdOutlineAccountCircle } from "react-icons/md";
import { BiHelpCircle } from "react-icons/bi";
import { FiArrowRightCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import { AiOutlineShopping } from "react-icons/ai";
import { TbShoppingCartOff } from "react-icons/tb";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { LuLogOut } from "react-icons/lu";
import toast from "react-hot-toast";
import { AiOutlineHome } from "react-icons/ai";
import "../App.css";
import useCart from "../hooks/useCart/useCart";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { MdDashboardCustomize } from "react-icons/md";


const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [carts , refetch] = useCart();
  // console.log("carts : " , orders)

  const handleLogOut = () => {
    logout()
      .then(() => {
        toast.success("Logout Successful");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

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

  return (
    <>
      <div className="py-1 visitOurFacebookAppNavbar flex justify-end pr-24">
        <div className="flex">
          <h1 className="font-semibold">Visit Our Facebook App </h1>
          <div>
            <FaFacebook className="text-lg" />
          </div>
        </div>
      </div>

      <div className="navbar bg-base-100 lg:px-[104px] py-4 flex justify-between ">
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded w-52"
          >
            <Link to="/" className="flex">
              <AiOutlineHome className="text-2xl font-semibold mt-[3px]" />
              <p className="text-xl font-semibold ml-1">Home</p>
            </Link>
            <Link to="/" className="flex">
              <BiHelpCircle className="text-2xl font-semibold mt-[3px]" />
              <p className="text-xl font-semibold ml-1">Customer Help</p>
            </Link>
            {user ? (
              <Link to="/checkout" className="flex">
                <FiArrowRightCircle className="text-2xl font-semibold mt-[3px]" />
                <p className="text-xl font-semibold ml-1"> Checkout</p>
              </Link>
            ) : (
              <Link to="/login" className="flex">
                <FiArrowRightCircle className="text-2xl font-semibold mt-[3px]" />
                <p className="text-xl font-semibold ml-1">Checkout</p>
              </Link>
            )}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Cricket Store
        </Link>

        <div className="navbar-end lg:w-[331px]">
          {user ? (
            <div className="dropdown dropdown-end lg:border-r-2 lg:border-slate-400 lg:pr-3 pr-6">
              <label tabIndex={0} className="hover:cursor-pointer">
                <MdOutlineAccountCircle className="w-[28px] h-[28px] mx-[35%] " />
                {user ? <p>{user?.displayName ? user?.displayName : 'Unknown'}</p> : <p>My Account</p>}
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/dashboard/myOrders"
                    className="text-lg font-semibold"
                    
                  >
                    <MdDashboardCustomize className="text-2xl font-semibold"/>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <div
                    className="text-lg font-semibold"
                    onClick={() => handleLogOut()}
                  >
                    <LuLogOut className="text-2xl font-semibold" /> Logout
                  </div>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className=" border-r-2 border-slate-400 lg:pr-3  pr-6"
            >
              <MdOutlineAccountCircle className="w-[28px] h-[28px] mx-[35%]" />
              {user ? <p>{user.displayName}</p> : <p>My Account</p>}
            </Link>
          )}

          <Link
            to="/"
            className="border-r-2 border-slate-400 px-3 lg:block hidden"
          >
            <BiHelpCircle className="w-[28px] h-[28px] lg:ml-[37px]" />
            <p>Customer Help</p>
          </Link>
          {user ? (
            <Link to="/checkout" className="pl-3 lg:block hidden">
              <FiArrowRightCircle className="w-[28px] h-[28px] lg:ml-[18px]" />
              <p>Checkout</p>
            </Link>
          ) : (
            <Link to="/login" className="pl-3 lg:block hidden">
              <FiArrowRightCircle className="w-[28px] h-[28px] lg:ml-[18px]" />
              <p>Checkout</p>
            </Link>
          )}
        </div>
      </div>
      <div className="py-3 navbar3rdpart flex justify-between lg:px-[104px] pr-3 ">
        <div className="flex">
          <Link
            to="/"
            className="lg:pl-4  text-lg font-semibold text-white lg:block hidden"
          >
            Home
          </Link>
          <Link
            to="/shopallproducts"
            className="lg:pl-4  text-lg font-semibold text-white lg:block hidden"
          >
            Shop (All Products)
          </Link>
          <Link
            to="/shopallproducts"
            className="lg:pl-4 pl-4 text-lg font-semibold text-white lg:hidden block"
          >
            All Products
          </Link>
          <Link
            to="/contactus"
            className="lg:pl-4 pl-4 text-lg font-semibold text-white lg:block hidden"
          >
            Contact Us
          </Link>
          <Link
            to="/contactus"
            className="lg:pl-4 pl-4 text-lg font-semibold text-white lg:hidden block"
          >
            Contact
          </Link>
          <Link
            to="/orders"
            className="lg:pl-4 pl-4 text-lg font-semibold text-white"
          >
            Cart
          </Link>
        </div>

        <div className="flex ">
          <div className="drawer drawer-end">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex">
              {/* Page content here */}
              <label
                className="text-lg font-semibold text-white  hover:cursor-pointer"
                htmlFor="my-drawer-4"
              >
                {carts?.length}
              </label>
              <label htmlFor="my-drawer-4">
                <AiOutlineShopping className="w-[28px] h-[28px] ml-1 text-orange-400  hover:cursor-pointer" />
              </label>
            </div>
            <div className="drawer-side z-10">
              <div className="p-4 lg:w-[370px] w-[300px] min-h-full sidebarBackground text-base-content ">
                <label
                  htmlFor="my-drawer-4"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                >
                  {/* x */}
                </label>
                <div className="flex justify-between">
                  <h3 className="text-lg font-semibold px-3 mb-2">
                    Shopping Cart
                  </h3>
                  <label
                    htmlFor="my-drawer-4"
                    aria-label="close sidebar"
                    className="drawer-overlay text-4xl font-semibold mt-[-8px]"
                  >
                    x
                  </label>
                </div>
                <hr />

                <div>
                  {carts.length ? (
                    carts?.map((order) => (
                      <div key={order?._id}>
                        <div className="flex py-3 justify-between">
                          <label
                            htmlFor=""
                            className="text-xl hover:cursor-pointer font-semibold"
                            onClick={() => handleDelete(order)}
                          >
                            x
                          </label>

                          <div>
                            <p className="text-base font-semibold lg:w-[256px] w-[200px]">
                              {order?.productName.slice(0, 31)}
                            </p>
                            <p className="text-base font-semibold text-slate-500">
                              {order?.quantity} * {order?.recentPrice}
                            </p>
                          </div>

                          <img
                            src={order?.image}
                            alt="cricket"
                            className="w-9 h-9 rounded-full"
                          />
                        </div>
                        <hr />
                      </div>
                    ))
                  ) : (
                    <div className=" my-20">
                      <TbShoppingCartOff className="text-7xl text-green-600  mx-[40%]" />

                      <h2 className="text-lg font-semibold text-green-600 text-center">
                        There are no products here , please add products to the
                        cart
                      </h2>
                    </div>
                  )}
                </div>

                <div className="mt-3">
                  {/* <h2 className="text-lg font-semibold mb-2">Subtotal : </h2> */}
                  <hr />
                  <Link to="/orders">
                    <button className="btn bg-cyan-700 text-white w-full hover:bg-cyan-800">
                      View Cart
                    </button>
                  </Link>
                  {user ? (
                    <Link to="/checkout">
                      {" "}
                      <button className="btn bg-cyan-700 text-white w-full hover:bg-cyan-800 mt-2">
                        Checkout
                      </button>
                    </Link>
                  ) : (
                    <Link to="/login">
                      {" "}
                      <button className="btn bg-cyan-700 text-white w-full hover:bg-rose-800 mt-2">
                        Checkout
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
