import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Shipping from "../ShippingHomeSection3/Shipping";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../App.css";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
const Login = () => {
  const { loginUser , googleUser } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const location = useLocation();
  console.log("location vai" , location);
  const from = location.state?.from?.pathname || "/";

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    loginUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("Login successfully");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const handleGoogleUser = () => {
    googleUser()
    .then((result) => {
      const user = result.user;
      console.log(user);
      toast.success("Login successfully");
      navigate(location?.state?.from?.pathname ||  "/" , {replace : true});
    })
    .catch((error) => {
      toast.error(error.message);
    });
  }
  return (
    <div>
      <div className="lg:mx-[104px] mx-4">
        <h1 className="text-4xl font-bold mt-10"> My Account</h1>
        <h3 className="text-3xl font-bold mt-6 mb-4">Login</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="text-lg font-semibold">Email Address</label>
            <input
              type="email"
              className="w-full h-[40px] border border-solid border-orange-600 rounded text-lg font-semibold pl-3"
              {...register("email")}
              required
              placeholder="Enter Your Email"
            />
          </div>

          <div className="mt-2">
            <label className="text-lg font-semibold">Password</label>
            <input
              type="password"
              className="w-full h-[40px] border border-solid border-orange-600 rounded text-lg font-semibold pl-3"
              {...register("password")}
              required
              placeholder="Enter Your Password"
            />
          </div>

          
          <Link
            to="/signup"
            className="text-lg font-semibold text-green-600 hover:underline block mt-2"
          >
            Are you new here ? please signup
          </Link>


          <button className="btn bg-green-600 text-white lg:w-[315px] w-full mt-2 hover:bg-green-700">
            Submit
          </button>
        </form>
        
        <div className="max-w-[300px] mt-3">
        <FcGoogle className="text-3xl  hover:cursor-pointer mx-auto"onClick={handleGoogleUser} />
        </div>
       
      </div>

      <Shipping></Shipping>
    </div>
  );
};

export default Login;
