import Link from 'next/link';
import Container from './ui/container';

const Navbar = () => {
    return (
      <div>
        <Container>
        <div className="fixed bg-blue-500 py-2 px-5 z-50">
              <div className="container mx-auto flex justify-center items-center">
                  <div className="flex items-center h-16 justify-between">
                  <Link href='/' className='text-white'>Shop Smart</Link>
                  <Link href='/login' className='text-white'>Sign in</Link>
                  <Link href='/register' className='text-white'>Sign up</Link>
                  <Link href='/cart' className='text-white'>Cart</Link>
                  </div>
              </div>
          </div>
        </Container>
      </div>
    )
  }
  
  export default Navbar