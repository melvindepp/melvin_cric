
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import { useState , useContext} from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import './Review.css';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaCircleUser } from "react-icons/fa6";
import { IoIosStar } from "react-icons/io";
import { AuthContext } from "../../../AuthProvider/AuthProvider";

const Review = ({id}) => {
  const {user} = useContext(AuthContext)
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
    const axiosPublic = useAxiosPublic();
    const [data, setData] = useState({
        ratings : 2
    });
  
  

        const {data : reviews = [] , refetch} = useQuery({
                queryKey : ['rating'],
                queryFn : async() => {
                   const res = await axiosPublic.get(`/ratings/${id}`)
                    console.log("review " , res.data);
                    return res.data;
                }
        })

    const handleReview = (e) => {
            e.preventDefault();
            const form = e.target;
            const name = form.name.value;
            const email =form.email.value;
            const review = form.review.value;
            const ratings = data?.ratings;
            
            
            console.log( name , email , review , ratings);
            const info = {
                    name,
                    email,
                    review,
                    ratings,
                    productId : id
            }
            axiosPublic.post('/ratings' , info)
            .then((res) => {
                console.log(res.data);
                if(res.data.insertedId){
                    toast.success("Your review has been successful!");
                    refetch();
                }

            })

            
    }

    return (
        <div>
            <div className="border-t border-b py-4 mt-16">
                    <h1 className="text-2xl font-bold text-center">Reviews ({reviews?.length})</h1>
            </div>



            <div className="flex gap-16 lg:px-16 flex-col md:flex-row mt-10 mx-3 lg:mx-0">
                {/* reviews */}
                  
                <div className="w-full lg:w-[45%]">

                {   reviews?.length ? 
                
                  reviews?.length === 1 ? <>
                  <div className="w-full border">
                 <div className="flex items-center px-5 py-10 gap-8">
                 <div>
             <FaCircleUser className="text-5xl"/>
             </div>
             <div>
                     <h1 className="text-xl flex items-center font-bold">{reviews[0]?.name} <span className="text-lg pl-5 font-bold flex gap-2 items-center">Ratings : <span className="flex gap-1 items-center"> <IoIosStar className="text-xl text-orange-600"/> {reviews[0]?.ratings}</span></span></h1>
                     <h2 className="text-lg font-semibold">{reviews[0]?.email}</h2>
                     <p className="mt-2"><span className="text-lg font-bold">Review :</span> {reviews[0]?.review}</p>
             </div>
                 </div>
           </div>    
             </>
             :
                <Slider {...settings}>
                    
                         {reviews?.map(review =>
                              <>
                                   <div className="w-full border">
                                  <div className="flex items-center px-5 py-10 gap-8">
                                  <div>
                              <FaCircleUser className="text-5xl"/>
                              </div>
                              <div>
                              <h1 className="text-xl flex items-center font-bold">{review?.name} <span className="text-lg pl-5 font-bold flex gap-2 items-center">Ratings : <span className="flex gap-1 items-center"> <IoIosStar className="text-xl text-orange-600"/> {review?.ratings}</span></span></h1>
                                      <h2 className="text-lg font-bold">{review?.email}</h2>
                                      <p className="mt-2"><span className="text-lg font-bold">Review :</span> {review.review}</p>
                              </div>
                                  </div>
                            </div>    
                              </>
                          )
                      }

                    
                       
                       
                      </Slider>
                      :

                    <div className="bg-blue-800 py-3 px-3 text-white">
                        <h1 className="text-xl">There are no reviews yet.</h1>
                    </div>
                    }
                </div>
                

                {/* form */}

                <form className="lg:w-[55%]  p-0"onSubmit={handleReview}>
                    
                    
                    
               <div className="form-control">
                 <label className="label pt-0">
            <span className="label-text text-lg font-semibold">Your Rating <span className="text-orange-600">*</span></span>
          </label>
          <div>
          <div id="rating"></div>
        <Rating
        isRequired
          value={data.ratings}
          visibleLabelId="rating"
          onChange={(selectedValue) =>
            setData((prevData) => ({ ...prevData, ratings: selectedValue }))
          }
          
        />
      </div>
 
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg font-semibold">Your Review <span className="text-orange-600">*</span></span>
          </label>
          <textarea className="textarea textarea-bordered w-full h-[200px]" placeholder="Review"name="review"required></textarea>
        </div>
        <div className="flex gap-3 flex-col md:flex-row">
        <div className="form-control w-full">
          <label className="label text-lg font-semibold">
            <span className="label-text">Name</span>
          </label>
          <input type="text"name="name"defaultValue={user?.displayName} placeholder="Name" className="input input-bordered w-full" required />
        </div>
        <div className="form-control w-full">
          <label className="label text-lg font-semibold">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="Email"defaultValue={user?.email} className="input input-bordered w-full" required name="email" />
          
        </div>
        </div>
        <div className="form-control mt-6">
          <button className="btn rounded-none bg-blue-900 hover:bg-blue-800 text-white">Submit</button>
        </div>
      </form>
            </div>
        </div>
    );
};

export default Review;