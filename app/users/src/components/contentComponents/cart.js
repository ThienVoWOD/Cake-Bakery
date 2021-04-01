import React, { Component } from "react";
import url from "../../url";

export default class cart extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
    };
  }

  async componentDidMount() {
    let id = JSON.parse(localStorage.getItem("product") || "[]");
    if (id) {
      await id.forEach((element) => {
        fetch(`${url}/product/${element.id}`)
          .then((res) => res.json())
          .then((data) => {
            data.quantity = element.quantity;
            data.total = element.quantity * data.price;
            this.setState({ cart: [...this.state.cart, data] });
          })
          .catch((err) => console.log(err));
      });
    }
  }

  onCellChange = (key, dataIndex, quantity) => {
    if (quantity < 0) {
      document.getElementById(`id${key}`).value = "1";
      quantity = 1;
    }
    const cart = [...this.state.cart];
    const target = cart.find((item) => item.id === key);
    if (target) {
      target[dataIndex] = quantity;
      target.total = Number(quantity) * Number(target.price);
      this.setState({ cart });
      let productList = JSON.parse(localStorage.getItem("product") || "[]");
      for (let i = 0; i < productList.length; i++) {
        if (productList[i].id === key) {
          productList[i].quantity = quantity;
          break;
        }
      }
      localStorage.setItem("product", JSON.stringify(productList));
    }
  };

  deleteProduct = (key) => {
    const { cart } = this.state;
    this.setState({ cart: cart.filter((p) => p.id !== key) });
    let productList = JSON.parse(localStorage.getItem("product") || "[]");
    for (let i = 0; i < productList.length; i++) {
      if (productList[i].id === key) {
        productList.splice(i, 1);
        break;
      }
    }
    localStorage.setItem("product", JSON.stringify(productList));
  };
  render() {
    return (
      <div>
        <section className="product_area p_100">
          <div className="container">
            {this.state.cart.length > 0 ? (
              <div>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Ảnh</th>
                      <th scope="col">Sản phẩm</th>
                      <th scope="col">Giá tiền</th>
                      <th scope="col">Số lượng</th>
                      <th scope="col">Tổng tiền</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.cart.map((product, i) => (
                      <tr>
                        <td>
                          <img
                            src={url + "/" + product.image_url}
                            height="100"
                            width="100"
                          />
                        </td>
                        <td>{product.name}</td>
                        <td>{product.price.toLocaleString()} đ</td>
                        <td>
                          <input
                            name="price"
                            type="number"
                            id={`id${product.id}`}
                            defaultValue={product.quantity}
                            min="1"
                            max="30"
                            onChange={(e) =>
                              this.onCellChange(product.id, i, e.target.value)
                            }
                          />
                        </td>
                        <td>{product.total.toLocaleString()} đ</td>
                        <td>
                          <button>
                            <a
                              style={{ color: "red" }}
                              onClick={() => {
                                this.deleteProduct(product.id);
                              }}
                            >
                              X
                            </a>
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>

                <div className="row cart_total_inner">
                  <div className="col-lg-7" />
                  <div className="col-lg-5">
                    <div className="cart_total_text">
                      <div className="cart_head">tổng tiền giỏ hàng</div>
                      <div className="total">
                        <h4>
                          Tổng{" "}
                          <span>
                            {this.state.cart
                              .reduce((sum, record) => sum + record.total, 0)
                              .toLocaleString() + " đ"}
                          </span>
                        </h4>
                      </div>
                      <div className="cart_footer">
                        <a className="pest_btn" href="/checkout">
                          Thanh toán
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <center>
                <h3>Không có sản phẩm trong giỏ hàng</h3>
              </center>
            )}
          </div>
        </section>
      </div>
    );
  }
}
