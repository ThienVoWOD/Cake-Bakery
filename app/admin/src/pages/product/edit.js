import React, { Component } from "react";
import url from "../../routes/urlconfig";
import axios from "axios";

export default class edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      price: this.props.price,
      describe: this.props.describe,
      category_id: this.props.category_id,
      roles: [],
      imageURL: "",
      token: JSON.parse(localStorage.getItem("data")).token,
    };
    this.editProduct = this.editProduct.bind(this);
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

  async editProduct(event) {
    event.preventDefault();

    const formData = new FormData();
    if (this.state.imageURL[0]) {
      // ---------------------------------------------------------------------------
      formData.append("image_url", this.state.imageURL[0]);
      console.log(this.state.imageURL[0]);
      formData.append("id", this.props.id);
      formData.append("price", this.state.price);
      formData.append("describe", this.state.describe);
      formData.append(
        "category_id",
        document.getElementById(`category${this.props.id}`).value
      );
      formData.append("name", this.state.name);

      const headers = Object.assign({
        Accept: "application/json",
        Authorization: `Bearer ${this.state.token}`,
      });
      await fetch(url + "/product/update/" + this.props.id, {
        method: "POST",
        headers: headers,
        body: formData,
      }).then((res) => {
        alert("Sửa thành công");
        window.location.href = "/cakes";
      });
      // ---------------------------------------------------------------------------
    } else {
      // ---------------------------------------------------------------------------
      const data = JSON.stringify({
        name: this.state.name,
        category_id: document.getElementById(`category${this.props.id}`).value,
        describe: this.state.describe,
        price: this.state.price,
      });

      const config = {
        method: "PUT",
        url: url + "/product/edit/" + this.props.id,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.state.token}`,
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          if (response.data === "Success") {
            alert("Sửa thành công");
            window.location.reload();
          } else {
            alert("Sửa thất bại. " + response.data);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      // ---------------------------------------------------------------------------
    }
  }
  render() {
    return (
      <div className="modal fade" id={`id${this.props.id}`}>
        <div className="modal-dialog modal-default">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Thay đổi tài khoản</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-12">
                  <form
                    className="box"
                    onSubmit={this.editProduct}
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
                          value={this.state.name}
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
                          value={this.state.price}
                          onChange={(e) =>
                            this.setState({ price: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="#">
                        <label htmlFor="img">Chọn ảnh của bánh</label>
                        <input
                          type="file"
                          className="form-control"
                          name="image_url"
                          onChange={
                            (e) => this.setState({ imageURL: e.target.files })
                            //this.handleChange(e.target.files)
                          }
                          accept="image/*"
                        />
                      </div>

                      <div className="#">
                        <label htmlFor="describe">Mô tả</label>
                        <textarea
                          className="form-control"
                          rows={3}
                          placeholder="Enter ..."
                          value={this.state.describe}
                          onChange={(e) =>
                            this.setState({ describe: e.target.value })
                          }
                          required
                        />
                        <div className="form-group">
                          <label htmlFor="role">Loại bánh</label>
                          <select
                            id={`category${this.props.id}`}
                            className="form-control"
                            defaultValue={this.state.category_id}
                          >
                            {this.state.roles.map((result) => {
                              return (
                                <option
                                  value={result.id}
                                  selected={
                                    result.id === this.state.category_id
                                  }
                                >
                                  {result.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="box-footer">
                        <button type="submit" className="btn btn-primary">
                          Thay đổi
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
    );
  }
}
