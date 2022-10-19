import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { setIsAdmin, setLoggedIn } from "../Context/authSlice";

export default function Home() {
  const dispatch = useDispatch();

  // To add logged in feature
  useEffect(() => {
    if (localStorage.getItem("user")) {
      //if user exists
      dispatch(setLoggedIn());
      if (resp.isAdmin == true) {
        //Change Admin Status is it's an admin
        dispatch(setIsAdmin());
      }
      //Passing the money to the set money function
      dispatch(setMoney({ money: resp.money || 0 }));
    }
  }, [])


  return (
    <div className="justify-center items-center text-center flex flex-col h-screen align-middle">
      <h1 className="text-5xl p-4">OOPSIE!</h1>
      <h3 className="text-3xl">Your One Stop Shopping Spot</h3>
    </div>
  )
}