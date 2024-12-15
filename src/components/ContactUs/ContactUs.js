import React from "react";
import { Link } from "react-router-dom";
import Shipping from "../ShippingHomeSection3/Shipping";
import "../../App.css";
const ContactUs = () => {
  return (
    <>
      <div>
        <img
          src="https://images.unsplash.com/photo-1587560699334-bea93391dcef?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29udGFjdCUyMHVzfGVufDB8fDB8fHww"
          alt=""
          className="w-full objectFit lg:h-[456px]"
        />
      </div>
      <div className="lg:px-[104px] pb-10 lg:mx-0 mx-6">
        <h1 className="text-3xl font-semibold py-5 text-center">Contact Us</h1>
        <p className="py-3 text-xl font-semibold">
            Email : naimul39@gmail.com
        </p>
        <p className="text-xl font-semibold">Call us : 018********</p>
      </div>

      <Shipping></Shipping>
    </>
  );
};

export default ContactUs;
