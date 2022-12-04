import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../Context/cartSlice';

export default function Product({ product }) {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    return (
        <div className="max-w-sm rounded-lg border shadow-md bg-gray-900 border-gray-700 p-5 m-4">
            <div href="#">
                <img className="rounded-t-lg" src={product.image} alt="" />
            </div>
            <div className="p-5">
                <div href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{product.productName}</h5>
                </div>
                <p className="mb-3 font-normal text-white">₹{product.price}</p>
                <p className="mb-3 font-normal text-white">Delivered in {product.noOfDaysForDelivery} Days</p>
                <button className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => dispatch(addToCart(product))} disabled={!isLoggedIn}>
                    {isLoggedIn ? "Add to Cart" : "Log In/Register First"}
                    <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
            </div>
        </div>

    )
}
