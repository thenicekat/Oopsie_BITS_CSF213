import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setIsAdmin, setIsApproved, setIsManager, setLoggedIn } from "../../Context/authSlice";


export default function Orders() {
    const isManager = useSelector(state => state.auth.isManager);
    const userDetails = JSON.parse(localStorage.getItem("user"));
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();

    const [orders, setOrders] = useState([]);
    const [allProducts, setAllProducts] = useState({});

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
    }, [])

    const changeStatus = (order) => {
        setMessage("");
        fetch("http://localhost:8080/order/update",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "orderId": order.orderId,
                    "status": !order.status
                }),
            })
            .then(rawResponse => rawResponse.json())
            .then(resp => console.log(resp))
            .catch(err => {
                console.log("Error Occured")
                setMessage(err.toString());
            });
            listOrders();
    }

    const listOrders = () => {
        setMessage("");
        fetch("http://localhost:8080/order/list",
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(rawResponse => rawResponse.json())
            .then(resp => {
                setOrders(resp);
            })
            .catch(err => {
                console.log("Error Occured")
                setMessage(err.toString());
            });
    }

    useEffect(() => {
        listOrders();
    }, [])


    return (
        isManager ? (<div className='py-20 min-h-screen'>
            <h2 className='text-3xl text-white'>Orders</h2>
            <div className='flex flex-wrap justify-center items-center text-center align-middle text-white'>
                Order Status Update
            </div>

            <br />
            <p className="text-white">{message}</p>
            <div className="overflow-x-auto relative shadow-md py-5 px-5">
                <table className="w-full text-sm text-left text-gray-500 rounded-xl">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                Buyer ID
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Order ID
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Products
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Due in
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Status
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Change Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => {
                            let counter = 0;
                            if (order.items) order.items.orderedProducts.forEach(product => counter += product.quantity);

                            let productsPerOrder = [];
                            order.items.orderedProducts.forEach(product => {
                                if (allProducts[product.productId]) productsPerOrder.push(allProducts[product.productId].productName);
                            })

                            return <tr className="bg-white border-b">
                                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                    {order.buyerId}
                                </th>
                                <td className="py-4 px-6">
                                    {order.orderId}
                                </td>
                                <td className="py-4 px-6">
                                    {productsPerOrder.map(product => product + " ")}
                                </td>
                                <td className="py-4 px-6">
                                    {order.noOfDaysForDelivery} Days
                                </td>
                                <td className="py-4 px-6">
                                    {order.status ? "Delivered" : "Not Delivered"}
                                </td>
                                <td className="py-4 px-6">
                                    <a onClick={() => changeStatus(order)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:cursor-pointer">Change Status</a>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>

        </div>) : (
            <div className="justify-center items-center text-center flex flex-col h-screen align-middle">
                <h3 className="text-3xl text-white">You have to be an admin to view this Page</h3>
            </div>
        )
    )
}