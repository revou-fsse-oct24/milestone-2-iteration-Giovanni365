import { GetServerSideProps } from 'next';

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

interface ProductDetailProps {
  product: Product | null;
  error: string | null;
}

const ProductDetail = ({ product, error }: ProductDetailProps) => {
  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!product) {
    return <div className="text-center">Product not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <img
        src={product.images[0]}
        alt={product.title}
        className="w-1/2 h-auto object-cover rounded-lg"
      />
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <p className="text-lg">{product.description}</p>
      <p className="text-xl font-semibold mt-4">Price: ${product.price}</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string }; 
  let product = null;
  let error = null;

  try {
    const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product details');
    }
    product = await response.json();
  } catch (e: any) {
    error = e.message;
  }

  return {
    props: {
      product,
      error,
    },
  };
};

export default ProductDetail;