import React from "react";
import { GrLocation } from "react-icons/gr";
import { GrSecure } from "react-icons/gr";

const Shipping = () => {
  return (
    <div>
      <hr className="mt-10 mb-6" />
      <div className="grid lg:grid-cols-4 grid-cols-1 lg:mx-[95px] mx-4">
        <div className="flex">
          <GrLocation className="text-xl mr-3 font-semibold mt-[5px]" />
          <div>
            <h3 className="text-base font-semibold">
              Nationwide shipping <br />
              Starts from only BDT.60
            </h3>
          </div>
        </div>
        <div className="flex lg:mt-0 mt-4">
          <GrLocation className="text-xl mr-3 font-semibold mt-[5px]" />
          <div>
            <h3 className="text-base font-semibold">
              Easy 7 days replacement <br />
              Only if the product is faulty
            </h3>
          </div>
        </div>
        <div className="flex lg:mt-0 mt-4">
          <GrLocation className="text-xl mr-3 font-semibold mt-[5px]" />
          <div>
            <h3 className="text-base font-semibold">
              Quality Ensured <br /> Every product's quality is ensured
            </h3>
          </div>
        </div>
        <div className="flex lg:mt-0 mt-4">
          <GrSecure className="text-xl mr-3 font-semibold mt-[5px]" />
          <div>
            <h3 className="text-base font-semibold">
              100% Secure Checkout <br />
              We don't sell your info
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
