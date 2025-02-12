import Link from 'next/link';
import Container from './ui/container';
import { FaCartShopping } from "react-icons/fa6";
import { useAuth } from "../context/AuthContext";


const Navbar = () => {
  const { token, logout } = useAuth();
    return (
      <div>
        <Container>
        <nav className="fixed top-0 left-0 w-full bg-blue-500 py-6 px-9 z-50 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-white text-xl font-bold">Shop Smart </Link>
            <div className="flex space-x-4">
        {token ? (
          <>
            <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-white">Sign In</Link>
            <Link href="/register" className="text-white">Sign Up</Link>
          </>
        )}
      </div>
              <Link href="/cart" className="text-white text-2xl">
              <FaCartShopping />
              </Link>
            </div>
        </nav>
        </Container>
      </div>
    )
  }
  
  export default Navbar