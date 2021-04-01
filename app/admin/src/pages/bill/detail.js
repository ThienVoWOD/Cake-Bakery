import React, { Component } from "react";
import url from "../../routes/urlconfig";
import axios from "axios";
import Moment from "react-moment";

export default class detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      token: JSON.parse(localStorage.getItem("data")).token,
    };
  }

  async componentDidMount() {
    await axios
      .get(url + "/orderDetail/" + this.props.id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.state.token}`,
        },
      })
      .then((res) => {
        this.setState({ data: res.data });
      });
  }
  render() {
    return (
      <div>
        <div className="modal fade" id={`id${this.props.id}`}>
          <div className="modal-dialog modal-default">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Chi tiết hóa đơn</h4>
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
                            <th>Số lượng</th>
                            <th>Ngày tạo</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.data.map((result, i) => {
                            return (
                              <tr>
                                <td key={i}>{result.id}</td>
                                <td key={i}>{result.Product.name}</td>
                                <td key={i}>{result.price} đ</td>
                                <td key={i}>{result.amount}</td>
                                <td key={i}>
                                  <Moment format="hh:mm:ss A DD-MM-YYYY">
                                    {result.createAt}
                                  </Moment>
                                </td>
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
          </div>
        </div>
      </div>
    );
  }
}
