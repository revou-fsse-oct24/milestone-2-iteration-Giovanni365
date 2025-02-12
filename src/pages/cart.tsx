import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  return (
    <div className="container mx-auto px-8 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white p-4 shadow-md rounded-lg mb-4 flex justify-between items-center">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-lg">${item.price} x {item.quantity}</p>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="bg-red-500 text-white px-4 py-2 rounded">Remove</button>
            </div>
          ))}
          <button onClick={clearCart} className="bg-gray-500 text-white px-4 py-2 rounded w-full mt-4">Clear Cart</button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
