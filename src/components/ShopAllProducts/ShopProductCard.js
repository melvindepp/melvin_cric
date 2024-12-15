
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider"
import Loading from "../Loading/Loading";
import ShopAllProduct from "./ShopAllProduct";
const ShopProductCard = ({filteredItems , data }) => {
   
    



    return (
        <div className="grid lg:grid-cols-4 gap-3 lg:mt-0 mt-4">
            
         
           {filteredItems.length > 0 ?  filteredItems?.map((product) => (
              <ShopAllProduct product={product} data={data}></ShopAllProduct>
            )) 
            :
            <h2 className="text-2xl font-semibold">There are no product here</h2>
            
           }
        </div>
    );
};

export default ShopProductCard;