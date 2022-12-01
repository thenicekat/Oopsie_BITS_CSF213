import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCart, removeFromCart } from '../Context/cartSlice';

export default function OrderProd({ productId, image, name, price, quantity }) {
    const dispatch = useDispatch();
    
    const product = {
        productId: productId,
        image: image,
        name: name,
        price: price,
        quantity: quantity
    }

    return (
        <div className="max-w-sm rounded-lg border shadow-md bg-cyan-800 border-gray-700 p-5 m-4">
            <div href="#">
                <img className="rounded-t-lg" src={image} alt="" />
            </div>
            <div className="p-5">
                <div href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
                </div>
                <p className="mb-3 font-normal text-gray-100">Total Cost: ₹{price} * {quantity} = ₹{price*quantity}</p>
                <button className="inline-flex items-center py-2 m-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => dispatch(addToCart(product))}>
                    +
                </button>
                <button className="inline-flex items-center py-2 m-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => dispatch(removeFromCart(product))}>
                    -
                </button>
            </div>
        </div>

    )
}
