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
import Detail from "./detail";
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
      .get(url + "/order", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.state.token}`,
        },
      })
      .then((res) => {
        this.setState({ data: res.data });
      });
    $(document).ready(function () {
      $("#example").DataTable();
    });
  }

  deleteOrder(id) {
    const config = {
      method: "DELETE",
      url: url + "/order/delete/" + id,

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.state.token}`,
      },
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
                  <h2>Danh Sách hóa đơn</h2>
                </div>
                <div style={{ fontSize: "14px" }}>
                  <table
                    id="example"
                    className="table table-hover table-bordered"
                  >
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Họ và tên</th>
                        <th>Địa chỉ</th>
                        <th>SĐT</th>
                        <th>Số tiền</th>
                        <th>Ngày tạo</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.data.map((result, i) => {
                        return (
                          <tr>
                            <td key={i}>{result.id}</td>
                            <td key={i}>{result.User.name}</td>
                            <td key={i}>{result.address}</td>
                            <td key={i}>{result.phone_number}</td>
                            <td key={i}>{result.price} đ</td>
                            <td key={i}>
                              <Moment format="hh:mm:ss A DD-MM-YYYY">
                                {result.createAt}
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

                                <a
                                  onClick={() => {
                                    if (
                                      window.confirm(
                                        `Bạn có muốn xóa tài khoản "${result.name}" không?`
                                      )
                                    ) {
                                      this.deleteOrder(result.id);
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
                            <Detail id={result.id} />
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
