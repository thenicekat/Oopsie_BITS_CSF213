import { useSelector, useDispatch } from "react-redux";
import { setLoggedIn, setIsAdmin, setIsManager, setIsApproved } from "../Context/authSlice";
import { useEffect, useState } from "react";

export default function Wallet() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const [message, setMessage] = useState("");

    const [orders, setOrders] = useState([]);

    const fetchOrders = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        //console.log(user);
        if (user && user.id) {
            fetch("http://localhost:8080/order/listbyuser?userId=" + user.id,
                {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then(rawResponse => rawResponse.json())
                .then(resp => {
                    console.log(resp);
                    setOrders(resp);
                })
                .catch(err => {
                    console.log("Error Occured")
                    setMessage(err.toString());
                });
        }
    }

    // To add logged in feature
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.id) {
            //if user exists
            dispatch(setLoggedIn());
            if (user.isAdmin === true) {
                //Change Admin Status is it's an admin
                dispatch(setIsAdmin());
            }

            if (user.isManager === true) {
                dispatch(setIsManager);
            }

            if (user.isApproved === true) {
                dispatch(setIsApproved);
            }
            
        }
        fetchOrders();
    }, [])

    return (
        isLoggedIn ? (<div className='py-20 min-h-screen'>
            <h2 className='text-3xl text-white'>Wallet</h2>
            <div className='flex flex-wrap justify-center items-center text-center align-middle text-white'>
                Order History
            </div>

            <p className="text-white">{message}</p>
            <br />

            <div className="overflow-x-auto relative shadow-md rounded-lg py-5 px-5">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                Order ID
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Total Quantity
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Total Cost
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, _) => {
                            let counter = 0;
                            if(order.items) order.items.orderedProducts.forEach(product => counter += product.quantity);

                            return (
                                <tr className="bg-gray-200 border-b" key={_}>
                                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                        {order.orderId}
                                    </th>
                                    <td className="py-4 px-6">
                                        {counter}
                                    </td>
                                    <td className="py-4 px-6">
                                        Rs. {order.cost} /-
                                    </td>
                                    <td className="py-4 px-6">
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

        </div>) : (
            <div className="justify-center items-center text-center flex flex-col h-screen align-middle">
                <h3 className="text-3xl text-white">Please Login or Register to Access Your Wallet</h3>
            </div>
        )
    )
}