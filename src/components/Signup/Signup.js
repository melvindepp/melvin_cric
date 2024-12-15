import React, { useContext } from "react";
import Shipping from "../ShippingHomeSection3/Shipping";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import toast from "react-hot-toast";

const Signup = () => {
  const { createUser, profileUpdate } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password).then((result) => {
      const user = result.user;
      console.log(user);
      toast.success("user created successfully");
      navigate("/");
      const userInfo = {
        displayName: data.firstName,
      };
      console.log(userInfo);
      profileUpdate(userInfo)
        .then(() => {})
        .catch(() => {});
    });

    fetch("https://cricket-shop-server.vercel.app/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div>
      <div className="lg:mx-[104px] mx-4">
        <h1 className="text-4xl font-bold mt-10"> My Account</h1>
        <h3 className="text-3xl font-bold mt-6 mb-4">Signup</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="text-lg font-semibold">First Name</label>
            <input
              type="text"
              className="w-full h-[40px] border border-solid border-orange-600 rounded text-lg font-semibold pl-3"
              {...register("firstName")}
              required
              placeholder="First Name"
            />
          </div>
          <div className="mt-2">
            <label className="text-lg font-semibold">Last Name</label>
            <input
              type="text"
              className="w-full h-[40px] border border-solid border-orange-600 rounded text-lg font-semibold pl-3"
              {...register("lastName")}
              required
              placeholder="Last Name"
            />
          </div>
          <div className="mt-2">
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
            to="/login"
            className="text-lg font-semibold text-green-600 hover:underline block mt-2"
          >
            Already have an account ? please login
          </Link>

          <button className="btn bg-green-600 text-white lg:w-[320px] w-full mt-2 hover:bg-purple-700">
            Submit
          </button>
        </form>
      </div>

      <Shipping></Shipping>
    </div>
  );
};

export default Signup;
