import React, { Component } from "react";
import url from "../../url";
import axios from "axios";

export default class checkout extends Component {
  constructor() {
    super();
    this.state = {
      product: [],
      address: "",
      phone: "",
      note: "",
    };
    this.order = this.order.bind(this);
  }

  order = (event) => {
    event.preventDefault();
    const token = localStorage.token ? localStorage.token : null;
    const user_id = localStorage.id ? localStorage.id : null;
    const data = JSON.stringify({
      address: this.state.address,
      phone_number: this.state.phone,
      price: this.state.product.reduce((sum, record) => sum + record.total, 0),
      status: this.state.note,
      id_user: user_id,
    });
    const config = {
      method: "POST",
      url: url + "/order/create",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    axios(config)
      .then(function (res) {
        let product = JSON.parse(localStorage.getItem("product") || "[]");
        if (product) {
          product.forEach((element) => {
            const data = JSON.stringify({
              id_order: res.data.id,
              id_product: element.id,
              price: element.price,
              amount: element.quantity,
            });
            const config = {
              method: "POST",
              url: url + "/orderDetail/create",

              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              data: data,
            };
            axios(config)
              .then(function (res) {})
              .catch(function (error) {
                console.log(error);
              });
          });
          alert("Đặt hàng thành công");
          localStorage.removeItem("product");
          window.location.replace("/");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  async componentDidMount() {
    if (!localStorage.token) {
      alert("Vui lòng đăng nhập để đặt hàng!");
      window.location.replace("/");
    }
    if (!localStorage.product || localStorage.getItem("product") === "[]") {
      alert("Không có sản phẩm trong giỏ hàng!");
      window.location.replace("/");
    }
    let id = JSON.parse(localStorage.getItem("product") || "[]");
    if (id) {
      await id.forEach((element) => {
        fetch(`${url}/product/${element.id}`)
          .then((res) => res.json())
          .then((data) => {
            data.quantity = element.quantity;
            data.total = element.quantity * data.price;
            this.setState({ product: [...this.state.product, data] });
          })
          .catch((err) => console.log(err));
      });
    }
  }
  render() {
    return (
      <section className="product_area p_100">
        <div className="container">
          <div className="row">
            <div className="col-lg-10">
              <div className="main_title">
                <h2>Chi tiết đặt hàng</h2>
              </div>
              <div className="billing_form_area">
                <form
                  className="billing_form row"
                  onSubmit={this.order}
                  method="post"
                >
                  <div className="form-group col-md-6">
                    <label htmlFor="address">Địa chỉ *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      onChange={(e) =>
                        this.setState({ address: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="phone">Số điện thoại *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      onChange={(e) => this.setState({ phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group col-md-12">
                    <label htmlFor="note">Ghi chú</label>
                    <input
                      type="text"
                      className="form-control"
                      name="note"
                      onChange={(e) => this.setState({ note: e.target.value })}
                    />
                  </div>
                  <div className="form-group col-md-12">
                    <div className="order_box_price">
                      <div className="payment_list">
                        <div className="price_single_cost">
                          <h5>
                            Bánh <span>Thành tiền</span>
                          </h5>
                          {this.state.product.map((product, i) => (
                            <h5>
                              {product.name} x {product.quantity}{" "}
                              <span>{product.total.toLocaleString()} đ</span>
                            </h5>
                          ))}
                          <h3>
                            Tổng tiền
                            <span>
                              {this.state.product
                                .reduce((sum, record) => sum + record.total, 0)
                                .toLocaleString() + " đ"}
                            </span>
                          </h3>
                        </div>
                        <button
                          type="submit"
                          className="btn pest_btn"
                          // onClick={this.order()}
                        >
                          Đặt hàng
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
