import Link from "next/link"

const Home = () => {
  return (
    <div className="text-blue-500">
       <h2 className="text-4xl font-bold mb-4">Welcome to ShopSmart</h2>
       <p className="text-lg mb-8">The best online shop for your needs!</p>
       <Link href="/login">Let's Begin shopping</Link>
    </div>
  )
}

export default Home