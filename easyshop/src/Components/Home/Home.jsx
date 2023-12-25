// Home.js
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar2 from "../Navbar/Navbar2";

function Home({searchQuery}) {
  const [products, setProducts] = useState([]);
  console.log(searchQuery)
useEffect(() => {
  const fetchProducts = async () => {
    let apiUrl

    // If there is a search query, append it to the API URL
    if (searchQuery) {
      apiUrl = `https://dummyjson.com/products/search?q=${searchQuery}`;
    } else {
      apiUrl = "https://dummyjson.com/products?limit=50";
    }

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data && data.products && Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        console.error("Invalid data format:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchProducts();
}, [searchQuery]);

  return (
    <div className="container mx-auto my-5">
      <Row className="mt-5 mb-3">
        {products.map((product) => (
          <Col key={product.id} md={3} style={{marginBottom: "25px"}}>
            <Card style={{ width: "15rem", height: "100%", marginTop: "30px" }}>
              <Card.Img
                variant="top"
                src={product.thumbnail}
                alt={product.title}
                style={{ height: "150px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title className="fw-bolder">{product.title}</Card.Title>
                <p>${product.price}</p>
                <center>
                  <Button variant="dark" className="fw-bolder" style={{paddingLeft: "40px",paddingRight: "40px"}} > <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    fill="white"
                    class="bi bi-cart"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                  </svg>   Add to Cart</Button>
                </center>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Home;
