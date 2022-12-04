import { useSelector, useDispatch } from "react-redux";
import { setLoggedIn, setIsAdmin, setIsManager, setIsApproved } from "../Context/authSlice";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

export default function Wallet() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const [message, setMessage] = useState("");

    const [orders, setOrders] = useState([]);
    const [allProducts, setAllProducts] = useState({});

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
                    // console.log(resp);
                    setOrders(resp);
                })
                .catch(err => {
                    console.log("Error Occured")
                    setMessage(err.toString());
                });
        }

        fetch('http://localhost:8080/products/list', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(rawResponse => rawResponse.json())
            .then(resp => {
                let tempMap = {};
                resp.forEach(product => {
                    tempMap[product.productId] = product
                })
                setAllProducts(tempMap);
            })
            .catch(err => {
                console.log("Error Occured")
                setMessage(err.toString());
            });
    }

    const addMoney = () => {
        let money = prompt("How much money do you want to add?");
        fetch('http://localhost:8080/user/transact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "emailId": JSON.parse(localStorage.getItem("user")).emailId,
                "money": parseFloat(money)
            })
        })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            if(result == true){
                alert("Money Added");
            }else{
                alert("Money Couldn't be added");
            }
        })
        .catch(error => console.log('error', error));
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
                dispatch(setIsManager());
            }

            if (user.isApproved === true) {
                dispatch(setIsApproved());
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

            <button
                className="bg-yellow-400 active:bg-gray-100 text-gray-800 px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                type="button"
                style={{ transition: "all .15s ease" }}
                onClick={addMoney}
            >
                Add Money
            </button>

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
                                Products
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Total Quantity
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Total Cost
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, _) => {
                            let counter = 0;
                            if (order.items) order.items.orderedProducts.forEach(product => counter += product.quantity);

                            let productsPerOrder = [];
                            order.items.orderedProducts.forEach(product => {
                                if (allProducts[product.productId]) productsPerOrder.push(allProducts[product.productId].productName);
                            })

                            return (
                                <tr className="bg-gray-200 border-b" key={_}>
                                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                        {order.orderId}
                                    </th>
                                    <td className="py-4 px-6">
                                        {productsPerOrder.map(product => product + ' ')}
                                    </td>
                                    <td className="py-4 px-6">
                                        {counter}
                                    </td>
                                    <td className="py-4 px-6">
                                        Rs. {order.cost} /-
                                    </td>
                                    <td className="py-4 px-6">
                                        {order.status ? "Delivered" : "Not Delivered"}-({order.noOfDaysForDelivery} Left)
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