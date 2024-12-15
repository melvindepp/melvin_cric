import React from "react";
import AllProducts from "../AllProducts/AllProducts";
import Loading from "../Loading/Loading";
import Shipping from "../ShippingHomeSection3/Shipping";
import Carousel from "./Carousel/Carousel";

const Home = () => {
  return (
    <>
      <Carousel></Carousel>
      <AllProducts></AllProducts>
      <Shipping></Shipping>
    </>
  );
};

export default Home;
