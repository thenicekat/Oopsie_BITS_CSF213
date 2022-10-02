import React from 'react';
import Product from '../Components/Product';
import { useSelector } from 'react-redux';

export default function Shopping({ data }) {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    
    return (
        isLoggedIn ? (<div className='py-20 min-h-screen'>
            <h2 className='text-3xl'>Products</h2>
            <div className='flex flex-wrap justify-center items-center text-center align-middle'>
                {data.products.map((product) => (
                    <Product key={product.id} product={product} id={product.id}></Product>
                ))}
            </div>
        </div>) : (
            <div className="justify-center items-center text-center flex flex-col h-screen align-middle">
                <h3 className="text-3xl">Please Login or Register to Access Cart</h3>
            </div>
        )
    );
}