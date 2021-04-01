import React, { Component } from "react";
import url from "../../routes/urlconfig";
import axios from "axios";
import Footer from "../../layouts/Footer";
import Header from "../../layouts/Header";

export default class create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roles: [],
      name: "",
      price: "",
      imageURL: "",
      describe: "",
      token: JSON.parse(localStorage.getItem("data")).token,
    };
    this.createProduct = this.createProduct.bind(this);
  }

  async componentDidMount() {
    await axios
      .get(url + "/categories", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.state.token}`,
        },
      })
      .then((res) => {
        this.setState({ roles: res.data });
      });
  }

  async createProduct(event) {
    event.preventDefault();
    const formData = new FormData();

    formData.append("image_url", this.state.imageURL[0]);
    formData.append("price", this.state.price);
    formData.append("describe", this.state.describe);
    formData.append("category_id", document.getElementById("category").value);
    formData.append("name", this.state.name);
    const headers = Object.assign({
      Accept: "application/json",
      Authorization: `Bearer ${this.state.token}`,
    });
    await fetch(url + "/product/create", {
      method: "POST",
      headers: headers,
      body: formData,
    }).then((res) => {
      alert("Thêm thành công");
      window.location.href = "/cakes";
    });
  }
  render() {
    return (
      <div>
        <Header />
        <div className="content-wrapper">
          <div className="container">
            <div className="content" style={{ backgroundColor: "white" }}>
              <div>
                <ul className="breadcrumb">
                  <li>
                    <a href="/">Trang chủ</a>
                  </li>
                  <li>
                    <a href="/cakes">Bánh</a>
                  </li>
                  <li className="active">Thêm</li>
                </ul>
                <div className="content">
                  <h1>Thêm bánh</h1>
                  <div className="row">
                    <div className="col-md-5">
                      <form
                        className="box"
                        onSubmit={this.createProduct}
                        method="POST"
                      >
                        <div className="box-body">
                          <div className="#">
                            <label htmlFor="name">Tên bánh</label>
                            <input
                              type="text"
                              name="name"
                              className="form-control"
                              onChange={(e) =>
                                this.setState({ name: e.target.value })
                              }
                              required
                            />
                          </div>
                          <div className="#">
                            <label htmlFor="price">Giá tiền (VNĐ)</label>
                            <input
                              type="number"
                              name="price"
                              min="0"
                              className={"form-control"}
                              onChange={(e) =>
                                this.setState({ price: e.target.value })
                              }
                              required
                            />
                          </div>
                          <div className="#">
                            <label htmlFor="price">Chọn ảnh của bánh</label>
                            <input
                              type="file"
                              className="form-control"
                              id="customFile"
                              name="image_url"
                              onChange={
                                (e) =>
                                  this.setState({ imageURL: e.target.files })
                                //this.handleChange(e.target.files)
                              }
                              accept="image/*"
                              required
                            />
                          </div>

                          <div className="#">
                            <label htmlFor="describe">Mô tả</label>
                            <textarea
                              className="form-control"
                              rows={3}
                              placeholder="Enter ..."
                              defaultValue={""}
                              onChange={(e) =>
                                this.setState({ describe: e.target.value })
                              }
                              required
                            />
                            <div className="form-group">
                              <label htmlFor="role">Loại bánh</label>
                              <select id="category" className="form-control">
                                {this.state.roles.map((result, i) => {
                                  return (
                                    <option key={i} value={result.id}>
                                      {result.name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          </div>
                          <div className="box-footer">
                            <button type="submit" className="btn btn-primary">
                              Thêm
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
