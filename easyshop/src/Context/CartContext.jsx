import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [addCart, setAddCart] = useState(() => {
    // Initialize with data from localStorage or an empty array
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    return storedCart;
  });
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Fetch user details from localStorage
    const authData = JSON.parse(localStorage.getItem('auth'));
    if (authData) {
      setUserId(authData.id);
    }
  }, []);

  const addToCart = async (productId) => {
    try {
      const response = await fetch('https://dummyjson.com/carts/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          products: [
            {
              id: productId,
              quantity: 1,
            },
          ],
        }),
      });

      const data = await response.json();
      console.log(data);

      const updatedCart = [...addCart, { productId, quantity: 1 }];
      setAddCart(updatedCart);

      // Update cart data in localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCart));

      console.log('Done');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const value = {
    addCart,
    addToCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
