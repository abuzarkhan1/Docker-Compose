import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="bg-[#00001a] border-b border-gray-800">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <NavLink 
          to="/"
          className="flex items-center"
        >
          <img 
            alt="MongoDB logo" 
            className="h-8" 
            src="https://raw.githubusercontent.com/mongodb-developer/mern-stack-example/603144e25ba5549159d1962601337652a7bfa253/mern/client/src/assets/mongodb.svg"
          />
        </NavLink>

        <NavLink 
          to="/create"
          className="px-4 py-2 bg-white text-black rounded text-sm font-medium hover:bg-gray-100 transition-colors duration-200"
        >
          Create Employee
        </NavLink>
      </nav>
    </div>
  );
}