import React, { Component } from "react";
import axios from "axios";
import url from "../../url";

export default class register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
    };
    this.submit_register = this.submit_register.bind(this);
  }
  submit_register = (event) => {
    event.preventDefault();

    const data = JSON.stringify({
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      role_id: 2,
    });

    const config = {
      method: "POST",
      url: url + "/register",

      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (res) {
        if (res.data === "Success") {
          alert("Đăng kí thành công");
          window.location.reload();
        } else {
          alert(res.data);
        }
      })
      .then(this.redirectStart)
      .catch(function (error) {
        console.log(error);
      });
  };
  render() {
    return (
      <div className="modal" id="register">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Đăng kí</h4>
              <button type="button" className="close" data-dismiss="modal">
                ×
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={this.submit_register}>
                <div className="form-group">
                  <label htmlFor="name">Họ tên:</label>
                  <input
                    type="name"
                    className="form-control"
                    id="name"
                    onChange={(e) => this.setState({ name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Địa chỉ email:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    onChange={(e) => this.setState({ email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="pwd">Mật khẩu:</label>
                  <input
                    type="password"
                    className="form-control"
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Đăng kí
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
