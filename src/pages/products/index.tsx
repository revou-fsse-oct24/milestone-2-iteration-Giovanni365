import { GetServerSideProps } from 'next';
import { useState } from 'react';
import Link from "next/link";

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

const ProductList = ({ products, categories, selectedCategory }: any) => {
  const [selectedCategoryLocal] = useState<string>(selectedCategory || '');

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = event.target.value;
    window.location.href = `/products?categoryId=${categoryId}`;
  };

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
              href={`/product/${product.id}?categoryId=${selectedCategoryLocal}`} 
              className="text-blue-500 text-center block mt-4"
            >
              View Details
            </Link>
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
