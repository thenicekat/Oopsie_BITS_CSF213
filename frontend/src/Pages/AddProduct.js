import React from 'react'
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function AddProduct() {
  const isManager = useSelector((state) => state.auth.isManager);

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  
  const [image, setImage] = useState("");
  const [details, setDetails] = useState("");

  const addProduct = () => {
  fetch("http://localhost:8080/products/add", 
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productName: productName,
      price: price,
      quantity: quantity,
      
      image: image,
      details: details,
    }),
    redirect: "follow",
  })
    .then((response) => response.text())
    .then((result) => console.log(result))

    .catch((error) => console.log("error", error));
  }

  return isManager ? (
    <div className="py-20 min-h-screen">
      <h2 className='text-3xl p-2 text-white'>Add Product</h2>
      <div class="block p-50 rounded-lg shadow-lg justify-center items-center">
        <form className="px-10"> 
          <div class="form-group mb-6">
            <input
              type="text"
              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInput7"
              placeholder="Product Name"
              required
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div class="form-group mb-6">
          <input
              type="number"
              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInput7"
              placeholder="Price"
              required
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div class="form-group mb-6">
          <input
              type="number"
              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInput7"
              placeholder="Quantity"
              required
              onChange={(e) => setQuantity(e.target.value)}
              
            />
          </div>
          <div class="form-group mb-6">
          <input
              type="text"
              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInput7"
              placeholder="Image URL"
              required
              onChange={(e) => setImage(e.target.value)}
              
            />
          </div>
          <div class="form-group mb-6">
          <textarea
              type="text"
              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInput7"
              placeholder="Description"
              required
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>
          <div class="form-group form-check text-center mb-6">
            <input
              type="checkbox"
              class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
              id="exampleCheck87"
              checked
              />

            <label
              class="form-check-label inline-block text-white"
              for="exampleCheck87"
            >
              Proceed To Change
            </label>
          </div>
          <button
            type="button"
            class="
      w-full
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out"
      
            onclick={addProduct}>

            Add
          </button>
        </form> 
      </div>
    </div>
  ) : (
    <div className="justify-center items-center text-center flex flex-col h-screen align-middle">
      <h3 className="text-3xl text-white">
        You need to be an admin to access this page
      </h3>
    </div>
  );
}
