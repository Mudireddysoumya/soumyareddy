import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
// import Home from "./Home";

import Contactus from "./Contactus";
import Aboutus from "./Aboutus";
import Cart from "./Cart";
import Milk from "./Milk";
import Login from "./Login";
import { logout } from "./Store";
// import VegItems from "./Veg";

import "./App.css";
import Nonveg from "./Nonveg";
import { useDispatch, useSelector } from "react-redux";
import Home from "./home";
import Veg from "./veg";
import Orders from "./Orders";
//  import Veg from "./Veg";
import '@fortawesome/fontawesome-free/css/all.min.css';

function App()
{
  const dispatch=useDispatch();
  const cart = useSelector((state) => state.cart);  // Ensure cart is always an array
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user); 
  

  return(
    <>
    <BrowserRouter>
  <div className="app-container">
    {/* Navigation Bar */}
    <nav className="navbar">
      <div className="logo">🛒 Grocery Store</div>

      {/* Centering the links */}
      <div className="nav-center">
        <Link to="/home"><i class="fa-solid fa-house"></i>Home</Link>
        <Link to="/veg"><i class="fa-solid fa-carrot"></i>Veg</Link>
        <Link to="/nonveg"><i class="fa-solid fa-fish"></i>Non-Veg</Link>
        <Link to="/milk"><i class="fa-solid fa-cow"></i>Milk</Link>
        <Link to="/aboutus"><i class="fa-solid fa-person"></i>AboutUs</Link>
        <Link to="/contactus"><i class="fa-solid fa-phone-volume"></i>ContactUs</Link>
        <Link to="/cart"><i class="fa-solid fa-cart-plus"></i>Cart <span className="cart-count">{totalItems}</span></Link>
        <Link to="/orders"><i class="fa-regular fa-money-bill-1"></i>Orders</Link>
      </div>
      {/* Authentication Section (Right Side) */}
      <div className="auth-section">
        {isAuthenticated ? (
          <>
            <span className="user-name">Welcome, {user}!</span>
            <button onClick={() => dispatch(logout())} className="btn-logout">Logout</button>
          </>
        ) : (
          <Link to="/login" className="btn-login">Sign In</Link>
        )}
      </div>
    </nav>
    {/* Page Content */}
    <div className="content">
    <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/veg" element={<Veg/>} />
        <Route path="/nonveg" element={<Nonveg/>}/>
        <Route path="/milk" element={<Milk />}/>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/aboutus" element={<Aboutus />}/>
        <Route path="/contactus" element={<Contactus/>}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/" element={<Navigate to="/home" />} /> {/* Redirect root to /home */}
      </Routes>
    </div>
  </div>

</BrowserRouter>
</>
)
}
export default App;