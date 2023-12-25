// Cart.js
import React, { useEffect, useState } from 'react';

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth"));

    // Fetch the cart data for the user with the specified ID
    fetch(`https://dummyjson.com/carts/user/${authData.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setCart(data.carts[0]?.products || []); // Assuming there's only one cart for a user
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching cart data:', error);
        setLoading(false);
      });
  }, []);

  // Calculate the subtotal
  const subtotal = cart.reduce((acc, item) => acc + item.total, 0);

  return (
    <section>
      <div className="container-fluid" style={{marginTop: "90px"}}>
        {loading ? (
          <p>Loading...</p>
        ) : cart.length > 0 ? (
          <>
            <div className="container-fluid text-center d-none d-lg-block">
              <div className="row">
                {/* ... (header row) */}
              </div>
            </div>
            {cart.map((item) => (
              <div key={item.id} className="row my-2 text-capitalize text-center">
                <div className="col-10 mx-auto col-lg-2">
                  <img src={item.thumbnail} style={{ width: '5rem', height: '5rem' }} className="img-fluid" alt="product" />
                </div>
                <div className="col-10 mx-auto col-lg-2">
                  <span className="d-lg-none">product : </span>{item.title}
                </div>
                <div className="col-10 mx-auto col-lg-2">
                  <span className="d-lg-none">price : </span>${item.price}
                </div>
                <div className="col-10 mx-auto col-lg-2 my-2 my-lg-2-0">
                  <div className="d-flex justify-content-center">
                    <div>
                      <span className="btn btn-black mx-1">-</span>
                      <span className="btn btn-black mx-1">{item.quantity}</span>
                      <span className="btn btn-black mx-1">+</span>
                    </div>
                  </div>
                </div>
                <div className="col-10 mx-auto col-lg-2">
                  <div className="cart-icon">
                    <i className="fas fa-trash"></i>
                  </div>
                </div>
                <div className="col-10 mx-auto col-lg-2">
                  <strong>item total : ${item.total}</strong>
                </div>
              </div>
            ))}
            <div className="row">
              <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-right">
                <h5>
                  <span className="text-title">subtotal: ${subtotal}</span>
                </h5>
              </div>
            </div>
          </>
        ) : (
          <div className="container mt-5">
            <div className="row">
              <div className="col-10 mx-auto text-center text-title">
                <h1>Your cart is currently empty</h1>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Cart;
