import React, { Component } from "react";
import url from "../../routes/urlconfig";
import axios from "axios";

export default class edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      token: JSON.parse(localStorage.getItem("data")).token,
    };
    this.editCategory = this.editCategory.bind(this);
  }

  async editCategory(event) {
    event.preventDefault();
    const config = {
      method: "PUT",
      url: url + "/category/edit/" + this.props.id,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.state.token}`,
      },
      data: JSON.stringify({
        name: this.state.name,
      }),
    };
    await axios(config)
      .then(function (response) {
        if (response.data === "Success") {
          alert("Thêm thành công");
          window.location.reload();
        } else {
          alert("Thêm thất bại");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div className="modal fade" id={`id${this.props.id}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Thêm loại</h4>
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
                  <form className="box" onSubmit={this.editCategory}>
                    <div className="box-body">
                      <div className="#">
                        <label htmlFor="name">Tên loại</label>
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          value={this.state.name}
                          onChange={(e) =>
                            this.setState({ name: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="box-footer">
                      <button type="submit" className="btn btn-primary">
                        Thay đổi
                      </button>
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
