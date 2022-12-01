import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
    // Compare new password and make user write again
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordAgain, setNewPasswordAgain] = useState("");
    const [passwordChanged, setPasswordChanged] = useState(false);

    const [errMsg, setErrMsg] = useState("");

    let passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    const resetPassword = () => {
        // This alert is only for debugging purposes
        alert(newPassword);

        if(!newPassword.match(passwordRegex)) {
            setErrMsg("Not a valid Password");
        } else if (newPassword != newPasswordAgain) {
            setErrMsg("Please write password correctly");
        } else {
            setErrMsg("");

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
                    New Password
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="newPassword" type="text" placeholder={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </div>
            <div className="mb-4">
                <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="newPasswordAgain">
                    New Password Again
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="newPasswordAgain" type="text" placeholder={newPasswordAgain} onChange={(e) => setNewPasswordAgain(e.target.value)} />
            </div>
            {errMsg ? <p className="text-red-500 text-xs italic">{errMsg}</p> : null}
            <button className="hover:bg-blue-400 font-bold py-2 px-4 rounded" type="button" disabled={passwordChanged} onClick={resetPassword}>
                Submit
            </button>
        </div>
    </div>
    )
}