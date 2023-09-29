import "../styles/navbar.css";
import Logo from "../assets/logo-no-background.svg";
import User from "../assets/user.svg";
import Cart from "../assets/cart.svg";
import Arrow from "../assets/arrow.svg";
import Search from "../assets/search.svg";
import CategoryMenu from "./CategoryMenu";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [showCategory, setShowCategory] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");

  const handleKeyChange = (e: any) => {
    // to set the state of keyword on every change
    setKeyword(e.target.value);
    // console.log(e.target.value);
    // to trigger redirect to search results page when enter is pressed
    if (e.key === "Enter") {
      if (keyword !== "") {
        navigate(`/result/${keyword}`);
      } else {
        handleRedirectHome();
      }
    }
  };

  // to reset the search to empty when back at home page
  const handleRedirectHome = () => {
    setKeyword("");
    navigate("/");
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar__title navbar__item logo">
          <img
            src={Logo}
            className="logo__icon"
            onClick={handleRedirectHome}
            alt="loot__logo"
          ></img>
        </div>
        <ul className="navbar__items">
          <li
            className="navbar__item"
            onClick={() => {
              setShowCategory(!showCategory);
            }}
          >
            <span className="arrow__text">Category</span>
            <img
              src={Arrow}
              className={showCategory ? "rotated__arrow__icon" : "arrow__icon"}
              alt="arrow__icon"
            />
          </li>
          {showCategory ? <CategoryMenu /> : <></>}

          <li className="navbar__item">Deals</li>
          <li className="navbar__item">What's New</li>
          <li className="navbar__item">Delivery</li>
          <li className="navbar__item search__container">
            <img
              src={Search}
              className="search__icon"
              alt="search__icon"
              onClick={() => {
                navigate(`/result/${keyword}`);
              }}
            />

            <input
              type="text"
              className="search__input"
              placeholder="Search Product"
              value={keyword}
              onChange={(e) => {
                handleKeyChange(e);
              }}
              onKeyDown={(e) => {
                handleKeyChange(e);
              }}
            ></input>
          </li>
          <li
            className="navbar__item"
            onClick={() => {
              if (localStorage.getItem("userId") === null) {
                navigate("/login");
              } else {
                navigate("/account");
              }
            }}
          >
            <img src={User} className="icon" alt="user__icon" />
            <span className="icon__text">Account</span>
          </li>
          <li
            className="navbar__item"
            onClick={() => {
              navigate("/cart");
            }}
          >
            <img src={Cart} className="icon" alt="cart__icon" />
            <span className="icon__text">Cart</span>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
