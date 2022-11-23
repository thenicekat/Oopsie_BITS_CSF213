import React from 'react'
import { useState } from 'react';

export default function EditProduct({ product }) {
    const [newPrice, setNewPrice] = useState(product.price);
    const [newQuantity, setNewQuantity] = useState(product.quantity);
    const [message, setMessage] = useState("");

    const changeQuantity = (e) => {
        setNewQuantity(e.target.value);
    }

    const changePrice = (e) => {
        setNewPrice(e.target.value);
    }

    const editProduct = () => {
        setMessage("");
        fetch("http://localhost:8080/products/update",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: product.productId,
                    image: product.image,
                    productName: product.productName,
                    price: parseFloat(newPrice),
                    quantity: parseFloat(newQuantity),
                    rating: product.rating,
                    details: product.details
                })
            })
            .then(response => response.json())
            .then(res => {
                if (res.price == parseFloat(newPrice) && res.quantity == parseFloat(newQuantity)) {
                    setMessage("Updated Successfully");
                } else {
                    setMessage("Error Occured");
                }
            })
            .catch(e => console.log("Error:", e));
    }

    const deleteProduct = () => {
        setMessage("");
        fetch("http://localhost:8080/products/delete?productId=89", {
            method: 'DELETE',
            redirect: 'follow'
        })
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }


    return (
        <div className="max-w-sm rounded-lg border shadow-md bg-cyan-800 border-gray-700 p-5 m-4">
            <div href="#">
                <img className="rounded-t-lg" src={product.image} alt="" />
            </div>
            <div className="p-5">
                <div href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
                </div>
                <p className='text-white'>Price</p>
                <span className='text-white'>₹</span><input type="text" className="mb-3 font-normal text-gray-700 dark:text-gray-400" defaultValue={`${newPrice}`} onChange={changePrice} />
                {/* <br /> */}
                <p className='text-white'>Quantity</p>
                <input type="text" className="mb-3 font-normal text-gray-700 dark:text-gray-400" defaultValue={`${newQuantity}`} onChange={changeQuantity} />
                <br />
                <button
                    className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={editProduct}>
                    Update
                </button>
                <br />
                <br />

                <button
                    className="font-bold py-2 px-3 rounded bg-red-100 hover:bg-red-500" type="button"
                    onclick={deleteProduct}>

                    Delete
                </button>
                <p className='text-green-400'>{message}</p>
            </div>
        </div>

    )
}
