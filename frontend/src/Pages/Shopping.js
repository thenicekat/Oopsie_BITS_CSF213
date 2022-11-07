import React from 'react';
import Product from '../Components/Product';

export default function Shopping({ data }) {
    
    return (
        (
        <div className='py-20 min-h-screen'>
            <h2 className='text-3xl text-white'>Products</h2>
            <div className='flex flex-wrap justify-center items-center text-center align-middle'>
                {data.products.map((product) => (
                    <Product key={product.id} product={product} id={product.id}></Product>
                ))}
            </div>
        </div>
        )
    );
}