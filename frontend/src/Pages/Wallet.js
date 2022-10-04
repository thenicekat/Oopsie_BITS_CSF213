import { useSelector } from "react-redux";

export default function Wallet() {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    return (
        isLoggedIn ? (<div className='py-20 min-h-screen'>
            <h2 className='text-3xl'>Wallet</h2>
            <div className='flex flex-wrap justify-center items-center text-center align-middle'>
                no
            </div>
        </div>) : (
            <div className="justify-center items-center text-center flex flex-col h-screen align-middle">
                <h3 className="text-3xl">Please Login or Register to Access Your Wallet</h3>
            </div>
        )
    )
}