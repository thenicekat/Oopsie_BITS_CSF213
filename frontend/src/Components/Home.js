import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="justify-center items-center text-center flex flex-col h-screen align-middle bg-gray-300">
        <h1 className="text-5xl p-4">OOPSIE!</h1>
        <h3 className="text-3xl">Your One Stop Shopping Spot</h3>
        <div className="flex">
            <Link className="p-3 bg-gray-400 hover:bg-gray-700 hover:text-white m-3 rounded-lg" to={'/register'}>Register</Link>
            <Link className="p-3 bg-gray-400 hover:bg-gray-700 hover:text-white m-3 rounded-lg" to={'/login'}>Login</Link>
        </div>
    </div>
  )
}