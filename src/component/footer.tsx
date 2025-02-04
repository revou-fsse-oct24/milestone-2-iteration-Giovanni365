const Footer= () => {
  return (
    <div className="bg-blue-700 text-black py-6 mt-10">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm">&copy; 2025 ShopSmart. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className="hover:text-gray-400">Privacy Policy</a>
          <a href="#" className="hover:text-gray-400">Terms of Service</a>
          <a href="#" className="hover:text-gray-400">Contact Us</a>
        </div>
      </div>
    </div>
  )
}

export default Footer