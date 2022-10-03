import { useState } from 'react';

export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

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
          <p className="text-red-500 text-xs italic">Please choose a strong password.</p>
        </div>
        <div className="flex items-center justify-between">
          <button className="font-bold py-2 px-4 rounded hover:bg-blue-500" type="button">
            Register
          </button>
        </div>
      </div>
    </div>
  )
}