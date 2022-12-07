import React from 'react'
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsAdmin, setIsApproved, setIsManager, setLoggedIn } from '../../Context/authSlice';
import { SERVER_URL } from './../../constants';


export default function AddProduct() {
  const isManager = useSelector((state) => state.auth.isManager);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const dispatch = useDispatch();

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [details, setDetails] = useState("");
  const [noOfDays, setNoOfDays] = useState("");

  const [verified, setVerified] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [sucMsg, setSucMsg] = useState("");

  const addProduct = () => {
    setErrMsg("");
    if (verified) {
      fetch(SERVER_URL + "/products/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productName: productName,
            price: price,
            quantity: quantity,
            category: category,
            image: image,
            details: details,
            noOfDaysForDelivery: noOfDays
          }),
          redirect: "follow",
        })
        .then((response) => response.json())
        .then((result) => {
          console.log(productName == result["productName"]);
          if(result["productName"] == productName){
            console.log("Added Successfully")
            setSucMsg("Added Successfully");
            setProductName("");
            setPrice("");
            setDetails("");
            setQuantity("");
            setImage("");
            setCategory("");
            setNoOfDays("");
          }
        })
        .catch((error) => console.log("error", error));
    }else{
      setErrMsg("Please Confirm your addition");
    }
  }

   // To add logged in feature
   useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if (user) {
        //if user exists
        dispatch(setLoggedIn());
        if (user.isAdmin === true) {
            //Change Admin Status is it's an admin
            dispatch(setIsAdmin());
        }

        if (user.isManager === true) {
            dispatch(setIsManager());
        }

        if (user.isApproved === true) {
            dispatch(setIsApproved());
        }       
    }
}, [])

  return (isManager || isAdmin) ? (
    <div className="py-20 min-h-screen">
      <h2 className='text-3xl p-2 text-white'>Add Product</h2>
      <div className="block p-50 rounded-lg shadow-lg justify-center items-center">
        <form className="px-10">
          <div className="form-group mb-6">
            <p className='text-white text-left'>Product Name</p>
            <input
              type="text"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInput7"
              placeholder={productName}
              value={productName}
              required
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div className="form-group mb-6">
            <p className='text-white text-left'>Category</p>
            <input
              type="text"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInput7"
              placeholder={category}
              value={category}
              required
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="form-group mb-6">
          <p className='text-white text-left'>Price</p>
            <input
              type="number"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInput7"
              placeholder={price}
              value={price}
              required
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="form-group mb-6">
          <p className='text-white text-left'>Quantity</p>
            <input
              type="number"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInput7"
              placeholder={quantity}
              value={quantity}
              required
              onChange={(e) => setQuantity(e.target.value)}

            />
          </div>
          <div className="form-group mb-6">
          <p className='text-white text-left'> No of Days for Delivery</p>
            <input
              type="number"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInput7"
              placeholder={noOfDays}
              value={noOfDays}
              required
              onChange={(e) => setNoOfDays(e.target.value)}

            />
          </div>
          <div className="form-group mb-6">
          <p className='text-white text-left'>Image URL</p>
            <input
              type="text"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInput7"
              placeholder={image}
              value={image}
              required
              onChange={(e) => setImage(e.target.value)}

            />
          </div>
          <div className="form-group mb-6">
          <p className='text-white text-left'>Details</p>
            <textarea
              type="text"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInput7"
              placeholder={details}
              value={details}
              required
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>
          <div className="form-group form-check text-center mb-6">
            <input
              type="checkbox"
              className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
              id="checkbox"
              checked={verified}
              onChange={() => setVerified(!verified)}
            />
            <label
              className="form-check-label inline-block text-white"
              htmlFor="checkbox"
            >
              Proceed To Add
            </label>
          </div>
          {errMsg && <p className="text-red-500 text-xs italic">{errMsg}</p>}
          {sucMsg && <p className="text-green-500 text-xs italic">{sucMsg}</p>}
          <button
            type="button"
            className="w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            onClick={addProduct}>
            Add
          </button>
        </form>
      </div>
    </div>
  ) : (
    <div className="justify-center items-center text-center flex flex-col h-screen align-middle">
      <h3 className="text-3xl text-white">
        You need to be a manager to access this page
      </h3>
    </div>
  );
}
