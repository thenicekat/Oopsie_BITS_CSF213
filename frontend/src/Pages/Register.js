import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setIsAdmin, setLoggedIn, setIsApproved, setIsManager } from '../Context/authSlice';
import { setMoney } from '../Context/cartSlice';
import { RiAdminFill } from 'react-icons/ri';
import { MdAdminPanelSettings } from 'react-icons/md';

export default function Register() {
  const [email, setEmail] = useState("");
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [password, setPassword] = useState("");

  const [loggingIn, setLoggingIn] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const userRegister = () => {
    if (!fname.length > 2) {
      setErrMsg("Enter a valid name");
    }
    else if (!email.match(emailRegex)) {
      setErrMsg("Enter a valid email");
    }
    else if (!password.match(passwordRegex)) {
      setErrMsg("Enter a Stronger Password");
    } else {
      setErrMsg("");
      setLoggingIn(true)

      //Fetch Request for register goes here
      fetch("http://localhost:8080/user/signup",
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            {
              firstName: fname,
              lastName: lname,
              emailId: email,
              password: password
            }
          ),
          redirect: 'follow'
        })
        .then(rawResponse => rawResponse.json())
        .then(resp => {
          if(resp.error != null){
            setErrMsg(resp.error);
          }

          if (resp.emailId === email) {
            //If we got a response from server with email
            //He can be logged in
            dispatch(setLoggedIn());
            if (resp.isAdmin === true) {
              //Change Admin Status is it's an admin
              dispatch(setIsAdmin());
            }
            if (resp.isManager === true) {
              //Change Admin Status is it's an admin
              dispatch(setIsManager());
              if(resp.isApproved === true){
                dispatch(setIsApproved);
              }
            }
            //Passing the money to the set money function
            dispatch(setMoney({ money: resp.money || 0 }));
            //Set the fetching status to false so that button is not disabled
            
            setLoggingIn(false);
            //Using localstorage to set items
            localStorage.setItem("user", resp);
            navigate("/shopping");
          }
        })
        .catch(err => {
          console.log("Error Occured");
          setErrMsg(err.toString());
          //Set the fetching status to false so that button is not disabled
          setLoggingIn(false);
        });

      // Registering ends here
    }
  }

  return (
    <div className='min-h-screen align-middle items-center flex flex-col justify-center content-center'>
      <div className="w-5/6 md:w-1/2 shadow-md rounded-3xl px-8 pt-6 pb-8 mb-4 flex flex-col bg-white">
        <div className="mb-4">
          <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="fname">
            First Name
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="fname" type="text" placeholder="First Name" onChange={(e) => setFName(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="lname">
            Last Name
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="lname" type="text" placeholder="Last Name" onChange={(e) => setLName(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="email" type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-6">
          <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" placeholder="******************" onChange={(e) => setPassword(e.target.value)} />
          {errMsg && <p className="text-red-500 text-xs italic">{errMsg}</p>}
        </div>
        <div className="flex items-center justify-between">
          <button className="font-bold py-2 px-4 rounded hover:bg-blue-500" type="button" onClick={userRegister} disabled={loggingIn}>
            Register
          </button>
          <div className='flex'>
            <Link to="/managerLogin"><button className="hover:bg-blue-400 font-bold py-2 px-4 rounded flex" type="button" disabled={loggingIn}>
              <RiAdminFill />
            </button></Link>

            <Link to="/adminLogin"><button className="hover:bg-blue-400 font-bold py-2 px-4 rounded flex" type="button" disabled={loggingIn}>
              <MdAdminPanelSettings />
            </button></Link>
          </div>
        </div>
      </div>
    </div>
  )
}