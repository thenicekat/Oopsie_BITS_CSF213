import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../Context/cartSlice';
import OrderProd from './../Components/OrderProd';

export default function Cart() {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.cart);
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const placeOrder = () => {
        //Fetch Request to Place an order
        dispatch(clearCart())
    }

    return (
        isLoggedIn ? (<div className='py-20 min-h-screen'>
            <h2 className='text-3xl p-2'>Cart</h2>
            <div className='flex flex-wrap justify-center items-center text-center align-middle'>
                {Object.keys(cart).map(key => {
                    return <OrderProd key={key} id={cart[key].id} name={cart[key].name} image={cart[key].image} price={cart[key].price} quantity={cart[key].quantity} />
                })}
            </div>
            <button className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={placeOrder}>
                Place Order
                <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
        </div>) : (
            <div className="justify-center items-center text-center flex flex-col h-screen align-middle">
                <h3 className="text-3xl">Please Login or Register to Access Cart</h3>
            </div>
        )
    )
}