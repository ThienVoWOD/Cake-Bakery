import React, { Component } from "react";
import url from "../../url";
export default class oneProductComponent extends Component {
  addToCart = (p) => {
    if (localStorage.token) {
      //return
    }
    let product = JSON.parse(localStorage.getItem("product") || "[]");
    const target = product.find((item) => item.id === p.id);
    const index = product.indexOf(target);
    if (target) {
      const newQuantity = target.quantity + 1;
      product.splice(index, 1, {
        id: p.id,
        quantity: newQuantity,
        price: p.price,
      });
    } else {
      product.push({
        id: p.id,
        quantity: 1,
        price: p.price,
      });
    }
    localStorage.setItem("product", JSON.stringify(product));
    alert("đã thêm vào giỏ hàng");
  };
  render() {
    const { b } = this.props;
    return (
      <div className="col-lg-4 col-md-4 col-6">
        <div className="cake_feature_item">
          <div className="cake_img">
            <img src={`${url}/${b.image_url}`} width="270" height="206" />
          </div>
          <div className="cake_text">
            <h4>{b.price.toLocaleString()} đ</h4>
            <h3>{b.name}</h3>
            <a className="pest_btn" onClick={() => this.addToCart(b)}>
              Thêm vào giỏ
            </a>
          </div>
        </div>
      </div>
    );
  }
}
