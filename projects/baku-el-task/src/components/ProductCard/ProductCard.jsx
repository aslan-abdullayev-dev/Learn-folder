import "./ProductCard.scss";

import React from "react";

import phone from "../../assets/img/phone.png";

function ProductCard() {
  return (
    <div className="product-card">
      <div className="left">
        <div className="img-wrapper">
          <img src={phone} alt="phone-img" />
        </div>
        <div className="body">
          <span className="name">Iphone 13 Pro Max 128GB Blue </span>
          <span className="category">Smartfonlar</span>
        </div>
      </div>
      <div className="right">
        <span className="original-price">3699 ₼</span>
        <span className="price-after-discount">3499 ₼</span>
      </div>
    </div>
  );
}

export default ProductCard;
