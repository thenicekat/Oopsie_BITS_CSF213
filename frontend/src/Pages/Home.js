import React from 'react';
import Product from '../Components/Product';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setIsAdmin, setLoggedIn, setIsApproved, setIsManager } from '../Context/authSlice';
import SERVER_URL from './../constants';


export default function Home() {
  const [input, setInput] = useState("");
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  // To add logged in feature
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
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

  useEffect(() => {
    fetch(SERVER_URL + "/products/list",
      {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(rawResponse => rawResponse.json())
      .then(resp => {
        setProducts(resp);
      })
      .catch(err => {
        console.log("Error Occured")
        setMessage(err.toString());
      });
  }, [])

  const onSearchChange = (e) => {
    console.log(e.target.value);
    setInput(e.target.value);
  }

  return (
    (
      <div className='py-20 min-h-screen w-full'>
        <h2 className='text-5xl text-white'>OOPSIE</h2>
        <h2 className='text-xl text-white'>Your one stop shopping app</h2>

        <br />

        <div class="flex justify-center">
          <div class="mb-3 xl:w-96">
            <div class="input-group relative flex flex-wrap items-stretch w-full mb-4 rounded">
              <input type="search" class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" onChange={onSearchChange} />
            </div>
          </div>
        </div>

        <div className='flex flex-wrap justify-center items-center text-center align-middle text-white'>
          {products.length > 0 ? (
            products.filter((product) => {
              return product.productName.toLowerCase().includes(input.toLowerCase());
            }).map(product => (
              <Product key={product.productId} product={product} id={product.productId} noOfDaysForDelivery={product.noOfDaysForDelivery}></Product>
            ))
          ) : (
            message || "Loading..."
          )}
        </div>
      </div>
    )
  );
}