import React from "react";
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import url from "../routes/urlconfig";
//For API Requests
import axios from "axios";
export default class Data extends React.Component {
  // State array variable to save and show data
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    //Get all users details in bootstrap table
    axios.get(url + "/products").then((res) => {
      //Storing users detail in state array object
      this.setState({ data: res.data });
    });
    //initialize datatable
    $(document).ready(function () {
      $("#example").DataTable();
    });
  }
  render() {
    //Datatable HTML
    return (
      <div className="MainDiv">
        <div class="jumbotron text-center">
          <h2>Danh sách xe gửi</h2>
        </div>
        <div className="" style={{ "font-size": "14px" }}>
          <table id="example" class="table table-hover table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên bánh</th>
                <th>Giá tiền</th>
                <th>Hình ảnh</th>
                <th>Loại bánh</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((result) => {
                return (
                  <tr>
                    <td>{result.id}</td>
                    <td>{result.name}</td>
                    <td>{result.price}</td>
                    <td>{result.image_url}</td>
                    <td>{result.Category.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
