import { useState, useDispatch } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [loggingIn, setLoggingIn] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const userRegister = () => {
    if(!name.length > 2){
      setErrMsg("Enter a valid name");
    }
    else if(!email.match(emailRegex)){
      setErrMsg("Enter a valid email");
    }
    else if(!password.match(passwordRegex)){
      setErrMsg("Enter a Stronger Password");
    }else {
      setErrMsg("");
      setLoggingIn(true)
      //Fetch Request for login goes here
      dispatch(setLoggedIn());
      //Change Admin Status is it's an admin
      dispatch(setIsAdmin());
      //Passing the money to the set money function
      dispatch(setMoney({ money: 1000 }));
      //Set the fetching status to false so that button is not disabled
      setLoggingIn(false);
      navigate("/shopping");
    }
  }

  return (
    <div className='min-h-screen align-middle items-center flex flex-col justify-center content-center bg-gray-300'>
      <div className="w-5/6 md:w-1/2 shadow-md rounded-3xl px-8 pt-6 pb-8 mb-4 flex flex-col bg-white">
        <div className="mb-4">
          <label className="block text-grey-darker text-sm font-bold mb-2" for="name">
            Name
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="name" type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-grey-darker text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="email" type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-6">
          <label className="block text-grey-darker text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" placeholder="******************" onChange={(e) => setPassword(e.target.value)} />
          {errMsg && <p className="text-red-500 text-xs italic">{errMsg}</p>}
        </div>
        <div className="flex items-center justify-between">
          <button className="font-bold py-2 px-4 rounded hover:bg-blue-500" type="button" onClick={userRegister}>
            Register
          </button>
        </div>
      </div>
    </div>
  )
}