import { GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext"; // Import Auth Context
import { useRouter } from "next/router"; 

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
}

const ProductList = ({ categories, selectedCategory }: any) => {
  const searchParams = useSearchParams();
  const id = searchParams.get('categoryId');
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const { token } = useAuth(); // Ambil token dari Auth Context
  const router = useRouter();

  // Proteksi halaman: Redirect ke login jika tidak ada token
  useEffect(() => {
    if (!token) {
      router.replace("/login");
    }
  }, [token, router]);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = event.target.value;
    window.location.href = `/products?categoryId=${categoryId}`;
  };

  const getProducts = async () => {
    try {
      let productRes;
      if (id) {
        productRes = await fetch(`https://api.escuelajs.co/api/v1/products/?categoryId=${id}`);
      } else {
        productRes = await fetch('https://api.escuelajs.co/api/v1/products');
      }

      const result = await productRes.json();
      setProducts(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container mx-auto px-8 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Products</h2>

      {/* Jika user belum login, tampilkan tombol Login */}
      {!token ? (
        <div className="text-center">
          <p className="text-red-500">You must be logged in to view products.</p>
          <Link href="/login">
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
              Login
            </button>
          </Link>
        </div>
      ) : (
        <>
          <select
            onChange={handleCategoryChange}
            className="p-2 border rounded mb-4"
          >
            <option value="">All Categories</option>
            {categories.map((category: any) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product: any) => (
              <div key={product.id} className="bg-cyan-100 p-4 shadow-md rounded-lg">
                <h3 className="text-lg font-semibold text-center">{product.title}</h3>
                <p className="text-lg mt-2 font-bold text-center">${product.price}</p>
                <img src={product.images[0]} className="rounded-lg w-76 mb-2 object-cover" />
                <Link href={`/products/${product.id}`} className="text-blue-500 text-center block mt-4">
                  View Details
                </Link>
                <button
                  onClick={() => addToCart({ ...product, quantity: 1 })}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { categoryId } = query;
  let categories = [];

  try {
    const categoryRes = await fetch('https://api.escuelajs.co/api/v1/categories');
    categories = await categoryRes.json();
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return {
    props: {
      categories,
      selectedCategory: categoryId || '',
    },
  };
};

export default ProductList;
