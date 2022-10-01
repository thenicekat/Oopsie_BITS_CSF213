import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../Context/cartSlice";

export default function Home() {
  const counter = useSelector(state => state.cart.counter);
  const dispatch = useDispatch();

  return (
    <>
    <div className="justify-center items-center text-center flex flex-col h-screen align-middle bg-gray-300">
        <h1 className="text-5xl p-4">OOPSIE!</h1>
        <h3 className="text-3xl">Your One Stop Shopping Spot</h3>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(addToCart())}
        >
          Increment
        </button>
        <span>{counter}</span>
    </div>
    </>
  )
}