import { useSelector, useDispatch } from 'react-redux';
import OrderProd from './../Components/OrderProd';
import { useEffect } from 'react';
import { useState } from 'react';
import { setLoggedIn, setIsManager, setIsAdmin, setIsApproved } from '../Context/authSlice';
import { clearCart } from '../Context/cartSlice';
import { SERVER_URL } from './../constants';


export default function Cart() {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.cart);
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const [totalPrice, setTotalPrice] = useState(0);
    const [message, setMessage] = useState("");
    const [orderStatus, setOrderStatus]= useState("");
    const [deliveryDate, setDeliveryDate]= useState("");

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
    }, [])

    useEffect(() => {
        let total = 0;
        console.log(cart);
        Object.keys(cart).forEach((key) => {
            total += cart[key].price * cart[key].quantity;
            setTotalPrice(total);
        })

        if (!Object.keys(cart).length) {
            setTotalPrice(0);
        }
    })

    const placeOrder = () => {
        //Fetch Request to Place an order
        const user = JSON.parse(localStorage.getItem("user"))
        if (!user) alert("Please Login/Register First");
        else {
            let order = {};

            order.cost = totalPrice;

            order.buyerId = user.id;

            let orderedProducts = [];
            Object.keys(cart).forEach((key) => {
                orderedProducts.push({
                    "productId": key,
                    "quantity": cart[key].quantity,
                    "priceAtPurchase": cart[key].price
                })
            })
            order.items = {
                "orderedProducts": orderedProducts
            };

            // console.log(JSON.stringify(order));

            fetch(SERVER_URL + "/order/place", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(order)
            })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                if(result.err){
                    setMessage(result.err);
                }else{
                    setOrderStatus("Order Placed Successfully");
                    setDeliveryDate("Will be Delivered In " + result.noOfDaysForDelivery + " Days");
                    dispatch(clearCart());
                }
            })
            .catch(error => console.log('error', error));
        }
    }

    return (
        isLoggedIn ? (<div className='py-20 min-h-screen'>
            <h2 className='text-3xl p-2 text-white'>Cart</h2>
            <p className='text-red-400'>{message}</p>
            <div className='flex flex-wrap justify-center items-center text-center align-middle'>
                {Object.keys(cart).map(key => {
                    return <OrderProd key={key} productId={cart[key].productId} name={cart[key].name} image={cart[key].image} price={cart[key].price} quantity={cart[key].quantity} />
                })}
            </div>

            <div className='justify-center items-center text-center align-middle bg-white p-4 m-4 rounded-xl'>
                <p className='text-xl'>Order Report</p>
                <br />
                <p>Total Price: {totalPrice}</p>
            </div>
            <p className='text-xl text-green-400 py-2'>{orderStatus}</p>
            <p className='text-xl text-green-400 py-2'>{deliveryDate}</p>
            <button className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={placeOrder}>
                Place Order
                <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
        </div>) : (
            <div className="justify-center items-center text-center flex flex-col h-screen align-middle">
                <h3 className="text-3xl text-white">Please Login or Register to Access Cart</h3>
            </div>
        )
    )
}