import "../styles/navbar.css";
import Logo from "../assets/logo-no-background.svg";
import Menu from "../assets/menu.svg";
import User from "../assets/user.svg";
import Cart from "../assets/cart.svg";
import Arrow from "../assets/arrow.svg";
import Search from "../assets/search.svg";
import CategoryMenu from "./CategoryMenu";
import { useNavigate } from "react-router-dom";
import { useEffect, useLayoutEffect, useState } from "react";
import ResponsiveCategoryMenu from "./ResponsiveCategoryMenu";
import { walkUpBindingElementsAndPatterns } from "typescript";
import Cookies from "universal-cookie";

function Navbar() {
  const navigate = useNavigate();
  const [showCategory, setShowCategory] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");
  const [menu, setMenu] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(window.innerWidth);
  var cookies = new Cookies;

  const handleKeyChange = (e: any) => {
    // to set the state of keyword on every change
    setKeyword(e.target.value);
    // to trigger redirect to search results page when enter is pressed
    if (e.key === "Enter") {
      if (keyword !== "") {
        navigate(`/result/${keyword}`);
      } else {
        handleRedirectHome();
      }
    }
  };

  const handleMenu = () => {
    setMenu(!menu);
    setShowCategory(false);
  };

  // to detect any window resize
  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // to reset the search to empty when back at home page
  const handleRedirectHome = () => {
    setKeyword("");
    navigate("/");
  };

  return (
    <>
      <div className="navbar">
        {width < 1025 ? (
          <div className="navbar__inner">
            <div
              className="navbar__title navbar__item logo"
              onClick={handleRedirectHome}
            ></div>
            <div className="search__container__responsive">
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
            </div>
            <img
              src={Menu}
              className="menu__icon"
              onClick={handleMenu}
              alt="menu__logo"
            ></img>
            {menu && (
              <ul className="navbar__items responsive">
                <li
                  className="navbar__item__responsive"
                  onClick={() => {
                    setShowCategory(!showCategory);
                  }}
                >
                  <span className="arrow__text">Category</span>
                  <img
                    src={Arrow}
                    className={
                      showCategory ? "rotated__arrow__icon" : "arrow__icon"
                    }
                    alt="arrow__icon"
                  />
                </li>

                <li
                  className="navbar__item__responsive"
                  onClick={() => {
                    navigate("/order");
                  }}
                >
                  <span>Order History</span>
                </li>

                {showCategory ? (
                  <ResponsiveCategoryMenu
                    showCategory={showCategory}
                    setShowCategory={setShowCategory}
                    setMenu={setMenu}
                  />
                ) : (
                  <></>
                )}
                <li className="navbar__item__responsive search__container">
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
                  className="navbar__item__responsive"
                  onClick={() => {
                    navigate("/account");
                  }}
                >
                  <img src={User} className="icon" alt="user__icon" />
                  <span className="icon__text"> Account </span>
                </li>
                <li
                  className="navbar__item__responsive"
                  onClick={() => {
                    navigate("/cart");
                  }}
                >
                  <img src={Cart} className="icon" alt="cart__icon" />
                  <span className="icon__text">Cart</span>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <>
            <div
              className="navbar__title navbar__item logo"
              onClick={handleRedirectHome}
            ></div>

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
                  className={
                    showCategory ? "rotated__arrow__icon" : "arrow__icon"
                  }
                  alt="arrow__icon"
                />
              </li>
              {showCategory ? (
                <CategoryMenu
                  showCategory={showCategory}
                  setShowCategory={setShowCategory}
                />
              ) : (
                <></>
              )}

              <li
                className="navbar__item"
                onClick={() => {
                  navigate("/order");
                }}
              >
                <span>Order History</span>
              </li>

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
                  navigate("/account");
                }}
              >
                <img src={User} className="icon" alt="user__icon" />
                <span className="icon__text">{!cookies.get('username')? 'Account': cookies.get('username')} </span>
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
          </>
        )}
      </div>
    </>
  );
}

export default Navbar;
