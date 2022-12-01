import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
    // Compare new password and make user write again
    const [email, setEmail] = useState("");
    const [emailEntered, setEmailEntered] = useState(false);

    const [errMsg, setErrMsg] = useState("");

    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const forgotPassword = () => {
        if(!email.match(emailRegex)) {
            setErrMsg("Not a valid email");
        } else {
            setErrMsg("");
            // TODO : send request
        }
    }

    return (
    <div className='min-h-screen align-middle items-center flex flex-col justify-center content-center'>
        <div className="w-5/6 md:w-1/2 shadow-md rounded-3xl px-8 pt-6 pb-8 mb-4 flex flex-col bg-white">
            <h1 className='font-bold text-xl py-3'>Forgot Password</h1>
            <div className="mb-4">
                <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="email">
                    We will be sending you new password, please enter email
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="email" type="text" placeholder={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            {errMsg ? <p className="text-red-500 text-xs italic">{errMsg}</p> : null}
            <button className="hover:bg-blue-400 font-bold py-2 px-4 rounded" type="button" disabled={emailEntered} onClick={forgotPassword}>
                Submit
            </button>
        </div>
    </div>
    )
}