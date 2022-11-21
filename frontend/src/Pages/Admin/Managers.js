import { useSelector } from "react-redux";

export default function Managers() {
    const isAdmin = useSelector(state => state.auth.isAdmin);

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
                        <tr class="bg-white border-b">
                            <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                Adarsh
                            </th>
                            <td class="py-4 px-6">
                                Benz
                            </td>
                            <td class="py-4 px-6">
                                Approved by Ben
                            </td>
                            <td class="py-4 px-6">
                                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Approve</a>
                            </td>
                        </tr>
                        <tr class="bg-gray-200 border-b">
                            <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                Atharva
                            </th>
                            <td class="py-4 px-6">
                                Nikon
                            </td>
                            <td class="py-4 px-6">
                                Rejected by Tom
                            </td>
                            <td class="py-4 px-6">
                                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Approve</a>
                            </td>
                        </tr>
                        <tr class="bg-white border-b">
                            <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                Rohan
                            </th>
                            <td class="py-4 px-6">
                                Apple
                            </td>
                            <td class="py-4 px-6">
                                Approved by Tom
                            </td>
                            <td class="py-4 px-6">
                                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Approve</a>
                            </td>
                        </tr>
                        <tr class="bg-gray-200 border-b">
                            <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                Murari
                            </th>
                            <td class="py-4 px-6">
                                Google
                            </td>
                            <td class="py-4 px-6">
                                Rejected by Ben
                            </td>
                            <td class="py-4 px-6">
                                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Approve</a>
                            </td>
                        </tr>
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