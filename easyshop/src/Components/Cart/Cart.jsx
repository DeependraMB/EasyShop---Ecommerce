import React, { useEffect, useState } from "react";
import { useCart } from "../../Context/CartContext";

function Cart() {
  const { addCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [cartData, setCartData] = useState([]);
  useEffect(() => {
    const fetchCartData = async () => {
      const productDetailsPromises = addCart.map(async (item) => {
        const response = await fetch(
          `https://dummyjson.com/products/${item.productId}`
        );
        const productData = await response.json();
        return {
          ...item,
          productDetails: productData, 
        };
      });
      const productDetails = await Promise.all(productDetailsPromises);
      setCartData(productDetails);
      setLoading(false);
    };

    fetchCartData();
  }, [addCart]);

  const totalQuantity = cartData.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const totalAmount = cartData.reduce(
    (total, item) => total + item.productDetails.price * item.quantity,
    0
  );

  return (
    <section>
      <div className="container-fluid" style={{ marginTop: "90px" }}>
        {loading ? (
          <p>Loading...</p>
        ) : cartData.length > 0 ? (
          <>
           
            {cartData.map((item) => (
              <div
                key={item.productId}
                className="row my-2 text-capitalize text-center border-bottom"
              >
                <div className="col-10 mx-auto col-lg-2">
                  <img
                    src={item.productDetails.thumbnail}
                    style={{ width: "5rem", height: "5rem" }}
                    className="img-fluid"
                    alt="product"
                  />
                </div>
                <div className="col-10 mx-auto col-lg-2">
                  <span className="d-lg-none">product : </span>
                  {item.productDetails.title}
                </div>
                <div className="col-10 mx-auto col-lg-2">
                  <span className="d-lg-none">price : </span>$
                  {item.productDetails.price}
                </div>
                <div className="col-10 mx-auto col-lg-2">
                  <strong>
                    item total : ${item.productDetails.price * item.quantity}
                  </strong>
                </div>
              </div>
            ))}
            <div
              className="row mt-3 pt-3"
              style={{
                color: "white",
                backgroundColor: "black",
                border: "black 4px solid",
                marginLeft: "300px",
                marginRight: "300px",
                marginTop: "90px",
              }}
            >
              <div className="col-10 mx-auto text-center">
                <h5>Total Products: {totalQuantity}</h5>
                <h5>Total Amount: ${totalAmount}</h5>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-10 mx-auto text-center">
                <button
                  className="btn btn-warning"

                  style={{ marginTop: '20px', padding: '10px 30px', fontSize: '18px' }}
                >
                  Place Order
                </button>
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
