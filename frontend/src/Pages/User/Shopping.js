import React from 'react';
import Product from '../../Components/Product';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setIsAdmin, setLoggedIn, setIsApproved, setIsManager } from '../../Context/authSlice';

export default function Shopping() {
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

                <div className='max-w-md mx-auto'>
                    <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                        <div className="grid place-items-center h-full w-12 text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        <input
                            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
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