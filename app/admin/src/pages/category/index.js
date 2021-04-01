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
import Create from "./create";
import Edit from "./edit";

export default class product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      name: "",
      token: JSON.parse(localStorage.getItem("data")).token,
    };
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
        this.setState({ data: res.data });
      });
    $(document).ready(function () {
      $("#example").DataTable({
        lengthMenu: [
          [5, 10, 25, 50, 100],
          [5, 10, 25, 50, 100],
        ],
      });
    });
  }

  deleteCategory(id) {
    const config = {
      method: "DELETE",
      url: url + "/category/delete/" + id,

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
          alert(response.data);
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
              <ul className="breadcrumb">
                <li>
                  <a href="/">Trang chủ</a>
                </li>
                <li>
                  <a href="/cakes">Bánh</a>
                </li>
                <li className="active">Loại bánh</li>
              </ul>
              <div className="MainDiv">
                <div className="jumbotron text-center">
                  <h2>Danh Sách Loại bánh</h2>
                </div>

                <div className="card-body">
                  <button
                    type="button"
                    className="btn btn-default pull-right margin-bottom"
                    data-toggle="modal"
                    data-target="#them"
                  >
                    Thêm loại
                  </button>
                </div>
                <Create />
                <div style={{ fontSize: "14px" }}>
                  <table
                    id="example"
                    className="table table-hover table-bordered"
                  >
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Ngày cập nhật</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.data.map((result, i) => {
                        return (
                          <tr>
                            <td key={i}>{result.id}</td>
                            <td key={i}>{result.name}</td>
                            <td key={i}>
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

                                <a
                                  onClick={() => {
                                    if (
                                      window.confirm(
                                        `Bạn có muốn xóa loại "${result.name}" không?`
                                      )
                                    ) {
                                      this.deleteCategory(result.id);
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
                            <Edit id={result.id} name={result.name} />
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
