import "bootstrap/dist/css/bootstrap.css";

import './App.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginPage from './Pages/LoginPage';
import HomePage from "./Pages/HomePage";
import CartPage from "./Pages/CartPage";


function App() {
  return (
    <div className="App">
     <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
