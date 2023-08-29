import "../styles/navbar.css";
import User from "../assets/user.svg";
import Cart from "../assets/cart.svg";
import Arrow from "../assets/arrow.svg";
import Search from "../assets/search.svg";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="navbar__title navbar__item logo">Shopcart</div>
      {/* <div className="navbar__item">Categories</div>
      <div className="navbar__item">Deals</div>
      <div className="navbar__item">What's New</div>
      <div className="navbar__item">Delivery</div>
      <div className="navbar__item">Account</div>
      <div className="navbar__item">Cart</div> */}
      <ul className="navbar__items">
        <li className="navbar__item">
          <span className="arrow__text">Category</span>
          <img src={Arrow} className="arrow__icon" alt="arrow__icon"/>
        </li>
        <li className="navbar__item">Deals</li>
        <li className="navbar__item">What's New</li>
        <li className="navbar__item">Delivery</li>
        <li className="navbar__item search__container">
          <div className="search">
            <span className="search__text">Search Product</span>
            <img src={Search} className="search__icon" alt="search__icon"/>
          </div>
        </li>
        <li
          className="navbar__item"
          onClick={() => {
            navigate("/account");
          }}
        >
          <img src={User} className="icon" alt="user_icon"/>
          <span className="icon__text">Account</span>
        </li>
        <li
          className="navbar__item"
          onClick={() => {
            navigate("/cart");
          }}
        >
          <img src={Cart} className="icon" alt="text_icon"/>
          <span className="icon__text">Cart</span>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
