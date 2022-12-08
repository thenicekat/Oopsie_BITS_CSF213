import { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { SERVER_URL } from './../../constants';

export default function ForgotPassword() {
    // Compare new password and make user write again
    const [email, setEmail] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const navigate = useNavigate();

    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const forgotPassword = () => {
        if(!email.match(emailRegex)) {
            setErrMsg("Not a valid email");
        } else {
            setErrMsg("");
            // TODO : send request
            fetch(SERVER_URL + '/user/generateotp', {
                method: 'POST',
                body: JSON.stringify({
                    emailId: email
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(rawResponse => rawResponse.json())
            .then(res => {
                if (res == true) {
                    alert("Email with OTP sent, please check :)")
                    navigate('/resetPassword');
                } else {
                    alert("Some error occured");
                }
            })
        }
    }

    return (
    <div className='min-h-screen align-middle items-center flex flex-col justify-center content-center'>
        <div className="w-5/6 md:w-1/2 shadow-md rounded-3xl px-8 pt-6 pb-8 mb-4 flex flex-col bg-white">
            <h1 className='font-bold text-xl py-3'>Forgot Password</h1>
            <div className="mb-4">
                <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="email">
                    We will be sending you an otp with the same
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="email" type="text" placeholder={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            {errMsg ? <p className="text-yellow-500 text-xs italic">{errMsg}</p> : null}
            <button className="hover:bg-green-400 font-bold py-2 px-4 rounded" type="button" onClick={forgotPassword}>
                Generate OTP
            </button>
            
                <button className="bg-orange-400 font-bold py-2 m-2 px-4 rounded" type="button">
                <Link to="/resetPassword">Already have OTP?</Link>
                </button>
            
        </div>
    </div>
    )
}