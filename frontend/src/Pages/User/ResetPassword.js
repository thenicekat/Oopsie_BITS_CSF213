import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from './../../constants';

export default function ResetPassword() {
    // Compare new password and make user write again
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordAgain, setNewPasswordAgain] = useState("");
    const [otp, setOTP] = useState("");
    const [passwordChanged, setPasswordChanged] = useState(false);

    const [errMsg, setErrMsg] = useState("");

    let passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    const resetPassword = () => {
        if(!newPassword.match(passwordRegex)) {
            setErrMsg("Not a valid Password");
        } else if (newPassword != newPasswordAgain) {
            setErrMsg("Please write password correctly");
        } else {
            setErrMsg("");
            fetch(SERVER_URL + '/user/updatePassword?newPassword=' + newPassword + "&otp=" + otp, {
                body: JSON.stringify({ emailId: email }),
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST'
            }).then(rawResponse => rawResponse.json())
            .then(res => {
                if (res == true) {
                    alert("Password has been reset :)")
                    setEmail("");
                    setNewPassword("");
                    setNewPasswordAgain("");
                    setOTP("");
                } else {
                    alert("Password couldn't be reset, try again");
                }
            })
            // TODO : send request to change password to newPassword
            // TODO : add submit button to run this function
        }
    }

    return (
    <div className='min-h-screen align-middle items-center flex flex-col justify-center content-center'>
        <div className="w-5/6 md:w-1/2 shadow-md rounded-3xl px-8 pt-6 pb-8 mb-4 flex flex-col bg-white">
            <h1 className='font-bold text-xl py-3'>Reset Password</h1>
            <div className="mb-4">
                <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="newPassword">
                    Email
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="email" type="text" placeholder={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-4">
                <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="newPassword">
                    OTP
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="otp" type="text" placeholder={otp} onChange={(e) => setOTP(e.target.value)} />
            </div>
            <div className="mb-4">
                <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="newPassword">
                    New Password
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="newPassword" type="password" placeholder={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </div>
            <div className="mb-4">
                <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="newPasswordAgain">
                    New Password Again
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="newPasswordAgain" type="password" placeholder={newPasswordAgain} onChange={(e) => setNewPasswordAgain(e.target.value)} />
            </div>
            {errMsg ? <p className="text-yellow-500 text-xs italic">{errMsg}</p> : null}
            <button className="hover:bg-blue-400 font-bold py-2 px-4 rounded" type="button" disabled={passwordChanged} onClick={resetPassword}>
                Submit
            </button>
        </div>
    </div>
    )
}