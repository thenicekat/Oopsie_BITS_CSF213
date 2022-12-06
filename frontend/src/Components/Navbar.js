import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { CiLogout } from 'react-icons/ci';
import { logOut } from '../Context/authSlice';
import SERVER_URL from './../constants';

export default function Navbar() {
    const location = useLocation();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const totalQuantity = useSelector(state => state.cart.totalQuantity);
    const isAdmin = useSelector(state => state.auth.isAdmin);
    const isManager = useSelector(state => state.auth.isManager);
    const isApproved = useSelector(state => state.auth.isApproved);
    const [walletText, setWalletText] = useState("Wallet");
    const [expanded, setExpanded] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));

    const changeMoneyToText = () => {
        setWalletText("Wallet");
    }

    const changeTextToMoney = () => {
        fetch(SERVER_URL + "/user/money?userId=" + user.id, {
            method: 'GET'
        })
            .then(response => response.text())
            .then(result => {
                setWalletText("₹" + result);
            })
            .catch(error => console.log('error', error));
    }

    const logout = () => {
        console.log(user);
        localStorage.removeItem("user");
        dispatch(logOut);
        window.location.reload();
    }

    return (
        <nav className="border-gray-200 px-2 sm:px-4 py-2.5 fixed w-full z-10">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <Link to="/" className="flex items-center">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">OOPSIE</span>
                </Link>

                <button collapse={expanded.toString()} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-md text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false" onClick={() => setExpanded(expanded ? !expanded : "expanded")}>
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                    {expanded && !isLoggedIn && <div className="width:100% list-style-type:none padding:0 margin:0">
                        <ul><Link to="/userLogin" className="flex items-center">Login</Link></ul>
                        <ul><Link to="/userRegister" className="flex items-center">Register</Link></ul>
                    </div>}
                    {expanded && isLoggedIn && <div className="width:100% list-style-type:none padding:0 margin:0">
                        <ul><Link to="/shopping" className="flex items-center">Shopping</Link></ul>
                        <ul><Link to="/cart" className="flex items-center">Cart</Link></ul>
                        <ul><Link to="/wallet" className="flex items-center">Wallet</Link></ul>
                    </div>}
                </button>

                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="flex flex-col p-4 mt-4 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-lg md:font-medium md:border-0 dark:border-gray-700">
                        {!isLoggedIn ? (
                            <>
                                {
                                    /* If user has not logged in, only then login and register screen will be shown*/
                                }
                                <li>
                                    <Link to="/userLogin" className={(location.pathname === "/userLogin" || location.pathname === "/managerLogin" || location.pathname === "/adminLogin" ? "text-yellow-400 " : "text-white ") + "block rounded bg-transparent md:p-2"}>Log in</Link>
                                </li>
                                <li>
                                    <Link to="/userRegister" className={(location.pathname === "/userRegister" ? "text-yellow-400 " : "text-white ") + "block rounded md:bg-transparent md:p-2"}>Register</Link>
                                </li>
                            </>
                        ) : (
                            <div className='flex'>
                                {
                                    /* Else shopping and cart screen tabs will be shown*/
                                }
                                <li className='pr-4'>
                                    <Link to="/shopping" className={(location.pathname === "/shopping" ? "text-yellow-400 " : "text-white ") + "block py-2 pr-4 pl-3 bg-yellow-400 rounded md:bg-transparent md:p-0"}>Shopping</Link>
                                </li>
                                <li className='pr-4'>
                                    <Link to="/cart" className={(location.pathname === "/cart" ? "text-yellow-400 " : "text-white ") + "block py-2 pr-4 pl-3 bg-yellow-400 rounded md:bg-transparent md:p-0"}>Cart<sup>{totalQuantity}</sup></Link>
                                </li>
                                {
                                    (isApproved || isAdmin) && (
                                        <div className='flex'>
                                            <li className='pr-4'>
                                                <Link to="/inventory" className={(location.pathname === "/inventory" ? "text-yellow-400 " : "text-white ") + "block py-2 pr-1 pl-3 bg-yellow-400 rounded md:bg-transparent md:p-0"}>Inventory</Link>
                                            </li>
                                            <li className='pr-4'>
                                                <Link to="/orders" className={(location.pathname === "/orders" ? "text-yellow-400 " : "text-white ") + "block py-2 pr-1 pl-3 bg-yellow-400 rounded md:bg-transparent md:p-0"}>Orders</Link>
                                            </li>
                                            {(isAdmin) && (
                                                <li className='pr-4'>
                                                    <Link to="/managers" className={(location.pathname === "/managers" ? "text-yellow-400 " : "text-white ") + "block py-2 pr-4 pl-1 bg-yellow-400 rounded md:bg-transparent md:p-0"}>Managers</Link>
                                                </li>
                                            )}
                                        </div>
                                    )
                                }

                                <li className='pr-4'>
                                    <Link to="/wallet" className={(location.pathname === "/wallet" ? "text-yellow-400 " : "text-white ") + "block border border-white px-4 bg-yellow-400 rounded md:bg-transparent"} onMouseEnter={changeTextToMoney} onMouseLeave={changeMoneyToText}>{walletText}</Link>
                                </li>
                                <li>
                                    <Link onClick={logout} className="text-white block p-1 rounded md:bg-transparent text-2xl"><CiLogout /></Link>
                                </li>
                            </div>
                        )}
                    </ul>
                </div>
            </div>
        </nav>

    )
}