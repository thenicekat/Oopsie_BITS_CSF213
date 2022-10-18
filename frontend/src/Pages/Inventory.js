import { useSelector } from 'react-redux';

export default function Inventory() {
    const isAdmin = useSelector(state => state.auth.isAdmin);

    return (
        isAdmin ? (<div className='py-20 min-h-screen'>
            <h2 className='text-3xl p-2'>Inventory</h2>
            <div className='flex flex-wrap justify-center items-center text-center align-middle'>
                Add and Update Inventory
            </div>

        </div>) : (
            <div className="justify-center items-center text-center flex flex-col h-screen align-middle">
                <h3 className="text-3xl">You need to be an admin to access this page</h3>
            </div>
        )
    )
}