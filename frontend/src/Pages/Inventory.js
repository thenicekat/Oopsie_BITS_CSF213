import { useSelector } from 'react-redux';
import EditProduct from './../Components/EditProduct';

export default function Inventory({ data }) {
    const isAdmin = useSelector(state => state.auth.isAdmin);

    return (
        isAdmin ? (<div className='py-20 min-h-screen'>
            <h2 className='text-3xl p-2 text-white'>Inventory</h2>
            <div className='flex flex-wrap justify-center items-center text-center align-middle text-white'>
                Add and Update Inventory
            </div>
            <div className='flex flex-wrap justify-center items-center text-center align-middle'>
                {data.products.map((product) => (
                    <EditProduct key={product.id} product={product} id={product.id} />
                ))}
            </div>
        </div>) : (
            <div className="justify-center items-center text-center flex flex-col h-screen align-middle">
                <h3 className="text-3xl">You need to be an admin to access this page</h3>
            </div>
        )
    )
}