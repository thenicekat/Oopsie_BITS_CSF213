import Product from './../Components/Product';
import { useSelector } from 'react-redux';

export default function Cart() {
    const cart = useSelector(state => state.cart.cart);

    return (
        <div className='py-20 min-h-screen'>
            <h2 className='text-3xl'>Cart</h2>
            <div className='flex flex-wrap justify-center items-center text-center align-middle'>
                {Object.keys(cart).forEach(key => {
                    
                })}
            </div>
        </div>
    )
}