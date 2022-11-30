import { useEffect, useState, useRef } from "react"
import { useDispatch } from "react-redux";
import { setIsAdmin, setLoggedIn, setIsApproved, setIsManager } from "../Context/authSlice";
import { setMoney } from "../Context/cartSlice"

export default function Home() {
  const dispatch = useDispatch();

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
        dispatch(setIsManager);
      }

      if (user.isApproved === true) {
        dispatch(setIsApproved);
      }
      //Passing the money to the set money function
      dispatch(setMoney({ money: user.money || 0 }));
    }
  }, [])


  return (
    <div className="justify-center items-center text-center flex flex-col h-screen align-middle">
      <h1 className="text-7xl p-4 text-white">OOPSIE!</h1>
      <h3 className="text-3xl text-white">Your One Stop Shopping Spot</h3>

      <br />
      <form class="flex items-center">
        <label for="simple-search" class="sr-only">Search</label>
        <div class="relative w-full">
          <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
          </div>
          <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Search" required />
        </div>
        <button type="submit" class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <span class="sr-only">Search</span>
        </button>
      </form>

    </div>
  )
}