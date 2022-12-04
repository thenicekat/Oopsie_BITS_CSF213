import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EditProduct from '../../Components/EditProduct';
import { setIsAdmin, setIsManager, setIsApproved, setLoggedIn } from '../../Context/authSlice';
import { Link } from 'react-router-dom';

export default function Inventory() {
    const isManager = useSelector(state => state.auth.isManager);
    const isAdmin = useSelector(state => state.auth.isAdmin);
    const isApproved = useSelector(state => state.auth.isApproved);
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();

    // To add logged in feature
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        // console.log(user);
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
        console.log(isManager)
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

    return (
        ((isManager && isApproved) || isAdmin) ? (<div className='py-20 min-h-screen'>
            <h2 className='text-3xl p-2 text-white'>Inventory</h2>
            <div className='flex flex-wrap justify-center items-center text-center align-middle text-white'>
                Add and Update Inventory
            </div>

            <Link to="/addproduct">
                <button
                    className="bg-yellow-400 active:bg-gray-100 text-gray-800 px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                >
                    Add a Product
                </button>
            </Link>

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