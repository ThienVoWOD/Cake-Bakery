import React from "react";
import { Formik } from "formik";
import url from "../../routes/urlconfig";
import axios from "axios";
import * as Yup from "yup";
export const edit = (props) => (
  <Formik
    initialValues={{
      email: props.email,
      name: props.name,
      id: props.id,
    }}
    onSubmit={(values) => {
      setTimeout(() => {
        const token = JSON.parse(localStorage.getItem("data")).token;
        const data = JSON.stringify({
          name: values.name,
          role_id: document.getElementById(`role${values.id}`).value,
        });

        const config = {
          method: "PUT",
          url: url + "/user/edit/" + values.id,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
      }, 1000);
    }}
    validationSchema={Yup.object().shape({
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
        handleChange,
        handleBlur,
        handleSubmit,
      } = props;

      return (
        <div className="modal fade" id={`id${values.id}`}>
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
                            disabled
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
                        <div className="form-group">
                          <label htmlFor="role">Quyền</label>
                          <select
                            id={`role${values.id}`}
                            className="form-control"
                          >
                            <option value="1">admin</option>
                            <option value="2">user</option>
                          </select>
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
    }}
  </Formik>
);

export default edit;
