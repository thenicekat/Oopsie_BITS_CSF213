import { useSelector } from "react-redux";
import { useEffect, useState } from "react";


export default function Managers() {
    const isAdmin = useSelector(state => state.auth.isAdmin);
    const userDetails = localStorage.getItem("user");

    const [managers, setManagers] = useState([]);

    const changeStatus = (manager) => {
        console.log(manager.emailId);
        fetch("http://localhost:8080/manager/changeStatus?statusChangedBy=" + "AdminNameHere",
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
                // setMessage(err.toString());
            });
    }

    useEffect(() => {
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
                // setMessage(err.toString());
            });
    }, [])


    return (
        isAdmin ? (<div className='py-20 min-h-screen'>
            <h2 className='text-3xl text-white'>Managers</h2>
            <div className='flex flex-wrap justify-center items-center text-center align-middle text-white'>
                Approve and Disapprove
            </div>

            <br />

            <div class="overflow-x-auto relative shadow-md py-5 px-5">
                <table class="w-full text-sm text-left text-gray-500 rounded-xl">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-200">
                        <tr>
                            <th scope="col" class="py-3 px-6">
                                Name
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Company
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Status/By
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {managers.map(manager => {
                            console.log(manager.isApproved);
                            return <tr class="bg-white border-b">
                                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                    {manager.firstName} {manager.lastName}
                                </th>
                                <td class="py-4 px-6">
                                    Benz
                                </td>
                                <td class="py-4 px-6">
                                    {manager.isApproved ? "Approved" : "Not Approved"}/{manager.approvedBy}
                                </td>
                                <td class="py-4 px-6">
                                    <a onClick={() => changeStatus(manager)} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Approve/Disapprove</a>
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