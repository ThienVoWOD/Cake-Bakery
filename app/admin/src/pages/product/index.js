import React, { Component } from "react";
import Footer from "../../layouts/Footer";
import Header from "../../layouts/Header";
import Moment from "react-moment";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import url from "../../routes/urlconfig";
import axios from "axios";
import Edit from "./edit";
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      token: JSON.parse(localStorage.getItem("data")).token,
    };
  }
  async componentDidMount() {
    await axios
      .get(url + "/products", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.state.token}`,
        },
      })
      .then((res) => {
        this.setState({ data: res.data });
      });

    $(document).ready(function () {
      $("#example").DataTable({
        lengthMenu: [
          [3, 10, 25, 50, 100],
          [3, 10, 25, 50, 100],
        ],
      });
    });
  }

  deleteProduct(id, image_url) {
    const config = {
      method: "DELETE",
      url: url + "/product/delete/" + id,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.state.token}`,
      },
      image_url: image_url,
    };
    axios(config)
      .then(function (response) {
        if (response.data === "Success") {
          alert("Xóa thành công");
          window.location.reload();
        } else {
          alert("Xóa thất bại");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <Header />
        <div className="content-wrapper">
          <div className="container">
            <div className="content" style={{ backgroundColor: "white" }}>
              <div className="MainDiv">
                <div className="jumbotron text-center">
                  <h2>Danh Sách Bánh</h2>
                </div>

                <div style={{ fontSize: "14px" }}>
                  <table
                    id="example"
                    className="table table-hover table-bordered"
                  >
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Tên bánh</th>
                        <th>Giá tiền</th>
                        <th>Hình ảnh</th>
                        <th>Loại bánh</th>
                        <th>Ngày cập nhật</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.data.map((result, i) => {
                        return (
                          <tr>
                            <td>{result.id}</td>
                            <td>{result.name}</td>
                            <td>{result.price} đ</td>
                            <td>
                              <img
                                src={`${url}/${result.image_url}`}
                                width={100}
                                height={100}
                              />
                            </td>
                            <td>{result.Category.name}</td>
                            <td>
                              <Moment format="hh:mm:ss A DD-MM-YYYY">
                                {result.updatedAt}
                              </Moment>
                            </td>
                            <td>
                              <div>
                                <a
                                  data-toggle="modal"
                                  data-target={`#id${result.id}`}
                                  className="btn btn-app"
                                  style={{ height: "30px" }}
                                >
                                  <i
                                    className="glyphicon glyphicon-edit"
                                    style={{ top: "-10px" }}
                                  />
                                </a>
                                <br />
                                <a
                                  onClick={() => {
                                    if (
                                      window.confirm(
                                        `Bạn có muốn xóa bánh "${result.name}" không?`
                                      )
                                    ) {
                                      this.deleteProduct(
                                        result.id,
                                        result.image_url
                                      );
                                    }
                                  }}
                                  className="btn btn-app"
                                  style={{ height: "30px" }}
                                >
                                  <i
                                    className="glyphicon glyphicon-remove"
                                    style={{ top: "-10px", color: "red" }}
                                  />
                                </a>
                              </div>
                            </td>
                            <Edit
                              id={result.id}
                              name={result.name}
                              price={result.price}
                              describe={result.describe}
                              category_id={result.Category.id}
                              imageURL_old={result.image_url}
                            />
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
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
