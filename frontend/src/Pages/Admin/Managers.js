import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setIsAdmin, setIsApproved, setIsManager, setLoggedIn } from "../../Context/authSlice";


export default function Managers() {
    const isAdmin = useSelector(state => state.auth.isAdmin);
    const userDetails = JSON.parse(localStorage.getItem("user"));
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();

    const [managers, setManagers] = useState([]);

    // To add logged in feature
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            //if user exists
            dispatch(setLoggedIn());
            if (user.isAdmin === true) {
                //Change Admin Status is it's an admin
                dispatch(setIsAdmin());
            }

            if (user.isManager === true) {
                dispatch(setIsManager());
            }

            if (user.isApproved === true) {
                dispatch(setIsApproved());
            }           
        }
    }, [])

    const changeStatus = (manager) => {
        setMessage("");
        fetch("http://localhost:8080/manager/changeStatus?statusChangedBy=" + userDetails.firstName,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "emailId": manager.emailId
                }),
            })
            .then(rawResponse => rawResponse.json())
            .then(resp => console.log(resp))
            .catch(err => {
                console.log("Error Occured")
                setMessage(err.toString());
            });
            setManagers([]);
            // Calling it twice so that we actually refresh it
            listManagers();
            listManagers();
    }

    const listManagers = () => {
        setMessage("");
        fetch("http://localhost:8080/manager/list",
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(rawResponse => rawResponse.json())
            .then(resp => {
                setManagers(resp);
            })
            .catch(err => {
                console.log("Error Occured")
                setMessage(err.toString());
            });
    }

    useEffect(() => {
        listManagers();
    }, [])


    return (
        isAdmin ? (<div className='py-20 min-h-screen'>
            <h2 className='text-3xl text-white'>Managers</h2>
            <div className='flex flex-wrap justify-center items-center text-center align-middle text-white'>
                Approve and Disapprove
            </div>

            <br />
            <p className="text-white">{message}</p>
            <div className="overflow-x-auto relative shadow-md py-5 px-5">
                <table className="w-full text-sm text-left text-gray-500 rounded-xl">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                Name
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Company
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Status/By
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {managers.map(manager => {
                            console.log(manager.isApproved);
                            return <tr className="bg-white border-b">
                                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                    {manager.firstName} {manager.lastName}
                                </th>
                                <td className="py-4 px-6">
                                    {manager.company}
                                </td>
                                <td className="py-4 px-6">
                                    {manager.isApproved ? "Approved" : "Not Approved"}/{manager.approvedBy}
                                </td>
                                <td className="py-4 px-6">
                                    <a onClick={() => changeStatus(manager)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:cursor-pointer">Approve/Disapprove</a>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>

        </div>) : (
            <div className="justify-center items-center text-center flex flex-col h-screen align-middle">
                <h3 className="text-3xl text-white">You have to be an admin to view this Page</h3>
            </div>
        )
    )
}