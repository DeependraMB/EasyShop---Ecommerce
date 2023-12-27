import "bootstrap/dist/css/bootstrap.css";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import CartPage from "./Pages/CartPage";
import { useEffect, useState } from "react";
import { CartProvider } from "./Context/CartContext";

function App() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const authToken = localStorage.getItem("auth");

        if (authToken) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          setToken(authToken);
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const isAuthenticated = Boolean(token);

  return (
    <div className="App">
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuthenticated ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/cart"
              element={isAuthenticated ? <CartPage /> : <Navigate to="/" />}
            />
          </Routes>
        </Router>
      </CartProvider>
    </div>
  );
}

export default App;
