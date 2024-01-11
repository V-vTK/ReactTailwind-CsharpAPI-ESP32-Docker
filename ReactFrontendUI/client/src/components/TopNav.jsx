import { usePocket } from "../contexts/PocketContext";

export const TopNav = () => {
    const { user, logout } = usePocket();
    
    if (user) {
      return (
        <div className="flex flex-row justify-between items-center border-2 border-gray-400 rounded-b-xl p-4 w-screen sticky top-0 bg-white z-10">
            <h2 className="font-bold text-lg m-2 text-center">Logged in: {user.email}</h2>
            <h1 className="font-bold text-3xl m-2 text-center mx-center absolute left-1/2 transform -translate-x-1/2">Vite + React + Tailwind With Pocketbase and C# API backend</h1>
            <button onClick={logout} className="text-md font-bold m-4 bg-blue-500 text-white rounded-md px-6 py-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Logout</button>
        </div>
      );
    }

}