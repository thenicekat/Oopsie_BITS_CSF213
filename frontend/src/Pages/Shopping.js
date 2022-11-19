import React from 'react';
import Product from '../Components/Product';
import { useState, useEffect } from 'react';

export default function Shopping() {
    const [input, setInput] = useState("");
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("http://localhost:8080/products/list",
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
    })

    const onSearchChange = (e) => {
        console.log(e.target.value);
        setInput(e.target.value);
    }

    return (
        (
            <div className='py-20 min-h-screen w-full'>
                <h2 className='text-3xl text-white'>Products</h2>

                <br />

                <div class='max-w-md mx-auto'>
                    <div class="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                        <div class="grid place-items-center h-full w-12 text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        <input
                            class="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                            type="text"
                            id="search"
                            placeholder={input}
                            onChange={onSearchChange} />
                    </div>
                </div>

                <div className='flex flex-wrap justify-center items-center text-center align-middle text-white'>
                    {products.length > 0 ? (
                        products.filter((product) => {
                            return product.productName.toLowerCase().includes(input.toLowerCase());
                        }).map(product => (
                            <Product key={product.productId} product={product} id={product.productId}></Product>
                        ))
                    ) : (
                        message || "Loading..."
                    )}
                </div>
            </div>
        )
    );
}