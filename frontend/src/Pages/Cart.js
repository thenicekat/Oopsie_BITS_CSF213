import { useSelector } from 'react-redux';
import OrderProd from './../Components/OrderProd';

export default function Cart() {
    const cart = useSelector(state => state.cart.cart);

    return (
        <div className='py-20 min-h-screen'>
            <h2 className='text-3xl'>Cart</h2>
            <div className='flex flex-wrap justify-center items-center text-center align-middle'>
                {Object.keys(cart).map(key => {
                    return <OrderProd key={key} name={cart[key].name} image={cart[key].image} price={cart[key].price}/>
                })}
            </div>
        </div>
    )
}