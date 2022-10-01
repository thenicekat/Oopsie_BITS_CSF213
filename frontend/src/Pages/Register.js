export default function Register() {
    return (
      <div className='min-h-screen align-middle items-center flex flex-col justify-center content-center bg-gray-300'>
        <div className="w-1/2 shadow-md rounded-3xl px-8 pt-6 pb-8 mb-4 flex flex-col bg-white">
          <div className="mb-4">
            <label className="block text-grey-darker text-sm font-bold mb-2" for="name">
              Name
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="name" type="text" placeholder="Name" />
          </div>
          <div className="mb-4">
            <label className="block text-grey-darker text-sm font-bold mb-2" for="email">
              Email
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="email" type="text" placeholder="Email" />
          </div>
          <div className="mb-6">
            <label className="block text-grey-darker text-sm font-bold mb-2" for="password">
              Password
            </label>
            <input className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" placeholder="******************" />
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