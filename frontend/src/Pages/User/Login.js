import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setIsAdmin, setIsApproved, setLoggedIn, setIsManager } from '../../Context/authSlice';
import { useNavigate, Link } from "react-router-dom";
import SERVER_URL from './../../constants';


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const userLogin = () => {
    if (!email.match(emailRegex)) {
      setErrMsg("Enter a valid email");
    }
    else if (!password.match(passwordRegex)) {
      setErrMsg("Not a valid Password");
    } else {
      setErrMsg("");
      setLoggingIn(true)

      //Fetch Request for login goes here
      fetch(SERVER_URL + "/user/signin",
        {
          method: "POST",
          body: JSON.stringify(
            {
              emailId: email,
              password: password
            }
          ),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(rawResponse => rawResponse.json())
        .then(resp => {
          console.log(resp)
          if (resp.user == null) {
            setErrMsg(resp.error);
          } else {

            if (resp.user.emailId === email) {
              //If we got a response from server with email
              //He can be logged in
              dispatch(setLoggedIn());
              if (resp.user.isAdmin === true) {
                //Change Admin Status is it's an admin
                dispatch(setIsAdmin());
              }
              if (resp.user.isManager === true) {
                //Change Admin Status is it's an admin
                dispatch(setIsManager());
                if (resp.user.isApproved === true) {
                  dispatch(setIsApproved());
                }
              }
              //Set the fetching status to false so that button is not disabled
              setLoggingIn(false);

              //Using localstorage to set items
              localStorage.setItem("user", JSON.stringify(resp.user));
              navigate("/shopping");
            }
          }
        })
        .catch(err => {
          console.log("Error Occured")
          setErrMsg(err.toString());
          //Set the fetching status to false so that button is not disabled
          setLoggingIn(false);
        });
    }
  }

  return (
    <main>
      <section className="absolute w-full h-full">
        <div
          className="absolute top-0 w-full h-full bg-gray-900"
          style={{
            backgroundImage:
              "url(/Assets/register_bg_2.png)",
            backgroundSize: "100%",
            backgroundRepeat: "no-repeat"
          }}
        ></div>
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <h6 className="text-gray-600 text-sm font-bold">
                      Sign in with
                    </h6>
                  </div>
                  <div className="btn-wrapper text-center">
                    <Link to="/adminLogin">
                      <button
                        className="bg-white active:bg-gray-100 text-gray-800 px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                      >
                        Admin
                      </button>
                    </Link>
                    <Link to="/managerLogin">
                      <button
                        className="bg-white active:bg-gray-100 text-gray-800 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                      >
                        Manager
                      </button>
                    </Link>
                  </div>
                  <hr className="mt-6 border-b-1 border-gray-400" />
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <div className="text-gray-500 text-center mb-3 font-bold">
                    <small>Or sign in with credentials</small>
                  </div>
                  <form>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Email"
                        style={{ transition: "all .15s ease" }}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Password"
                        style={{ transition: "all .15s ease" }}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    {errMsg && <p className="text-red-500 text-xs italic">{errMsg}</p>}

                    <div className="text-center mt-6">
                      <button
                        className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                        onClick={userLogin}
                      >
                        Sign In
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="flex flex-wrap mt-6">
                <div className="w-1/2">
                  <a
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                    className="text-gray-300"
                  >
                    <small>Forgot password?</small>
                  </a>
                </div>
                <div className="w-1/2 text-right">
                  <a
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                    className="text-gray-300"
                  >
                    <small>Create new account</small>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <FooterSmall absolute /> */}
      </section>
    </main>
  )
}