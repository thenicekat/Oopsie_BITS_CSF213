import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import EditProduct from './../Components/EditProduct';

export default function Inventory() {
    const isManager = useSelector(state => state.auth.isManager);
    const isApproved = useSelector(state => state.auth.isApproved);

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

    return (
        isManager && isApproved ? (<div className='py-20 min-h-screen'>
            <h2 className='text-3xl p-2 text-white'>Inventory</h2>
            <div className='flex flex-wrap justify-center items-center text-center align-middle text-white'>
                Add and Update Inventory
            </div>

            <br />

            <div className='flex flex-wrap justify-center items-center text-center align-middle'>
                {products.map((product) => (
                    <EditProduct key={product.productId} product={product} id={product.productId} />
                ))}
            </div>
        </div>) : (
            <div className="justify-center items-center text-center flex flex-col h-screen align-middle">
                <h3 className="text-3xl text-white">You need to be approved manager to access this page</h3>
            </div>
        )
    )
}