import React, { Component } from "react";

export default class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.submit_login = this.submit_login.bind(this);
  }
  submit_login = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.email, this.state.password);
  };
  render() {
    return (
      <div className="modal" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Đăng nhập</h4>
              <button type="button" className="close" data-dismiss="modal">
                ×
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={this.submit_login}>
                <div className="form-group">
                  <label htmlFor="email">Email address:</label>
                  <input
                    type="email"
                    className="form-control"
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
                  Đăng nhập
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
