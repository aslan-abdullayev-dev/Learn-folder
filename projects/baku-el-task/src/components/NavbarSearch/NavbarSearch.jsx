import "./NavbarSearch.scss";

import { Input, Space } from "antd";
import React, { useEffect, useRef, useState } from "react";

import SearchIcon from "../../assets/svg/search.svg?react";
import ProductCard from "../ProductCard/ProductCard";
import honorAdvertImg from "../../assets/img/honor-advert.png";

function NavbarSearch() {
  const searchRef = useRef(null);
  const [showSearchDropdown, setShowSerachDropdown] = useState(false);

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setShowSerachDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div className="navbar-search" ref={searchRef}>
      <Space.Compact size="large">
        <Input
          addonBefore={<SearchIcon />}
          placeholder="Axtar..."
          onFocus={() => setShowSerachDropdown(true)}
        />
      </Space.Compact>
      <div
        className={`search-dropdwn ${showSearchDropdown ? "show" : ""}`}
        onClick={() => setShowSerachDropdown(true)}
      >
        <div className="search-content">
          <div className="search-tags">
            <a href="" className="tag">
              Apple iPhone
            </a>
            <a href="" className="tag">
              iPhone 15
            </a>
            <a href="" className="tag">
              Apple Iphone 15 Pro Max
            </a>
            <a href="" className="tag">
              Apple Iphone 15 Pro Max
            </a>
          </div>
          <div className="categories-products">
            <div className="categories categories-products-item">
              <div>
                <h2 className="categories-products-title">Ən çox axtarılan</h2>
                <div className="categories-item">
                  <SearchIcon />
                  <span>Apple Iphone 11 pro, 128GB, Gold</span>
                </div>
                <div className="categories-item">
                  <SearchIcon />
                  <span>Apple Iphone 15 pro, 128GB, Gold</span>
                </div>
                {/* <div className="categories-item">
                  <SearchIcon />
                  <span>Apple Macbook Air 15 </span>
                </div>
                <div className="categories-item">
                  <SearchIcon />
                  <span>Apple Macbook Pro 16 inch, 256 GB</span>
                </div> */}
              </div>
              <div className="category-list">
                <h2 className="categories-products-title">Kategoriyalar</h2>
                <div className="categories-item">
                  <SearchIcon />
                  <span>Smartfonlar</span>
                </div>
                <div className="categories-item">
                  <SearchIcon />
                  <span>Qulaqlıqlar</span>
                </div>
                <div className="categories-item">
                  <SearchIcon />
                  <span>Kompyuterlər</span>
                </div>
              </div>
            </div>
            <div className="products">
              <div className="top">
                <h2 className="categories-products-title">Məhsullar</h2>
                <div className="prducts-wrapper">
                  <ProductCard />
                  <ProductCard />
                  {/* <ProductCard /> */}
                </div>
              </div>
              <div className="bottom">
                <img src={honorAdvertImg} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarSearch;
