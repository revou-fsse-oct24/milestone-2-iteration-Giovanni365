import { GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from "next/link";
import { useCart } from "../context/CartContext";

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

interface Category {
  id: number;
  name: string;
  image: string;
}

const ProductList = ({ categories, selectedCategory }: any) => {
  const searchParams = useSearchParams()
 
  const id = searchParams.get('categoryId')

  const [selectedCategoryLocal] = useState<string>(selectedCategory || '');

  const [products, setProducts] = useState([]);

  const { addToCart } = useCart();

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = event.target.value;
    window.location.href = `/products?categoryId=${categoryId}`;
  };

  const getProducts = async () => {
    let products = [];
    let categories = [];
  
    try {
  
      const categoryRes = await fetch('https://api.escuelajs.co/api/v1/categories');
      categories = await categoryRes.json();
  
      let productRes;
      if (id) {
        productRes = await fetch(`https://api.escuelajs.co/api/v1/products/?categoryId=${id}`);
      } else {
        productRes = await fetch('https://api.escuelajs.co/api/v1/products');
      }
      
      const result = await productRes.json();
      setProducts(result)
      return result

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  
  };

  useEffect(()=>{
    getProducts()
  },[])

  const filteredProducts = selectedCategoryLocal
    ? products.filter((product: any) => product.category.id === parseInt(selectedCategoryLocal))
    : products;

  return (
    <div className="container mx-auto px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Products</h2>
        <select
          value={selectedCategoryLocal}
          onChange={handleCategoryChange}
          className="p-2 border rounded"
        >
          <option value="">All Categories</option>
          {categories.map((category: any) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product: any) => (
          <div key={product.id} className="bg-cyan-100 p-4 shadow-md rounded-lg">
            <h3 className="text-lg font-semibold text-center">{product.title}</h3>
            <p className="text-lg mt-2 font-bold text-center">${product.price}</p>
            <img src={product.images[0]} className="rounded-lg w-76 mb-2 object-cover" />
            <Link
              href={`/products/${product.id}`} 
              className="text-blue-500 text-center block mt-4"
            >
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
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { categoryId } = query;
  let products = [];
  let categories = [];

  try {

    const categoryRes = await fetch('https://api.escuelajs.co/api/v1/categories');
    categories = await categoryRes.json();

    let productRes;
    if (categoryId) {
      productRes = await fetch(`https://api.escuelajs.co/api/v1/products/?categoryId=${categoryId}`);
    } else {
      productRes = await fetch('https://api.escuelajs.co/api/v1/products');
    }

    products = await productRes.json();
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return {
    props: {
      products,
      categories,
      selectedCategory: categoryId || '',
    },
  };
};

export default ProductList;
