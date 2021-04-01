import React from "react";
import Footer from "../../layouts/Footer";
import Header from "../../layouts/Header";
import url from "../../routes/urlconfig";
import { Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";

const ValidatedLoginForm = () => (
  <Formik
    initialValues={{ email: "", password: "", name: "" }}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        const token = JSON.parse(localStorage.getItem("data")).token;
        const data = JSON.stringify({
          email: values.email,
          password: values.password,
          name: values.name,
          role_id: document.getElementById("role").value,
        });

        const config = {
          method: "POST",
          url: url + "/user/create",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: data,
        };
        axios(config)
          .then(function (response) {
            if (response.data === "Success") {
              alert("Thêm thành công");
              window.location.href = "/users";
            } else {
              alert("Thêm thất bại");
              setSubmitting(false);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }, 1000);
    }}
    validationSchema={Yup.object().shape({
      email: Yup.string().email().required("Không được để trống"),
      password: Yup.string()
        .required("Chưa nhập mật khẩu.")
        .min(8, "Mật khẩu quá ngắn - ít nhất phải 8 ký tự.")
        .matches(/(?=.*[0-9])/, "Mật khẩu phải chứa nhất một số."),
      name: Yup.string()
        .required("Chưa nhập họ tên.")
        .min(5, "Họ tên quá ngắn - ít nhất phải 5 ký tự."),
    })}
  >
    {(props) => {
      const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
      } = props;
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
                    <a href="/users">Tài khoản</a>
                  </li>
                  <li className="active">Thêm</li>
                </ul>
                <div className="content">
                  <h1>Thêm tài khoản</h1>
                  <div className="row">
                    <div className="col-md-5">
                      <form onSubmit={handleSubmit} className="box">
                        <div className="box-body">
                          <div className="#">
                            <label htmlFor="name">Họ tên</label>
                            <input
                              type="text"
                              name="name"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.name}
                              className="form-control"
                            />
                            {errors.name && touched.name && (
                              <span
                                className="help-block"
                                style={{ color: "red" }}
                              >
                                {errors.name}
                              </span>
                            )}
                          </div>
                          <div className="#">
                            <label htmlFor="email">Email</label>
                            <input
                              type="text"
                              name="email"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                              className={"form-control"}
                            />
                            {errors.email && touched.email && (
                              <span
                                className="help-block"
                                style={{ color: "red" }}
                              >
                                {errors.email}
                              </span>
                            )}
                          </div>
                          <div className="#">
                            <label htmlFor="password">Mật khẩu</label>
                            <input
                              type="text"
                              name="password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password}
                              className={"form-control"}
                            />

                            {errors.password && touched.password && (
                              <span
                                className="help-block"
                                style={{ color: "red" }}
                              >
                                {errors.password}
                              </span>
                            )}
                          </div>
                          <div className="form-group">
                            <label htmlFor="role">Quyền</label>
                            <select id="role" className="form-control">
                              <option value="1">admin</option>
                              <option value="2">user</option>
                            </select>
                          </div>
                        </div>
                        <div className="box-footer">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn btn-primary"
                          >
                            Tạo
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      );
    }}
  </Formik>
);

export default ValidatedLoginForm;
