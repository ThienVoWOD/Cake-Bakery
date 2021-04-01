import React, { Component } from "react";
import { connect } from "react-redux";
import { productLoadByCat } from "../../api/product";
import { loadCategories } from "../../api/categories";
import OneProduct from "./oneProductComponent";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cat: {
        id: 1,
        name: "Bánh mì",
      },
      load: {
        id: 1,
        page: 1,
        keyword: "",
        begin: "",
        action: "default",
        end: "",
        name: "",
        sort: "",
      },
      resetPage: 1,
    };
    this.props.loadCategories();
    this.props.productLoadByCat(this.state.load);
  }

  onChangeCat = (id) => {
    let cat = this.props.categories.loaisanpham.find((c) => c.id === id);
    this.setState({ cat, resetPage: 1 });
    this.state.load = {
      action: "default",
      page: "1",
      id: id,
    };
    this.props.productLoadByCat(this.state.load);
  };
  onChangePage = (page) => {
    this.state.load.page = page;
    this.props.productLoadByCat(this.state.load);
    document.body.scrollTop = 200;
    document.documentElement.scrollTop = 200;
  };

  search = (keyword) => {
    this.state.load = {
      action: "search",
      page: "1",
      keyword: keyword,
      id: this.state.cat.id,
    };
    this.props.productLoadByCat(this.state.load);
  };

  findByPrice = () => {
    this.state.load = {
      id: this.state.cat.id,
      action: "price",
      page: "1",
      begin: document.getElementById("amount1").value + "000",
      end: document.getElementById("amount2").value + "000",
    };
    this.props.productLoadByCat(this.state.load);
  };

  sort = () => {
    const key = document.getElementById("sort").value;
    switch (key) {
      case "name_asc":
        this.state.load = {
          id: this.state.cat.id,
          action: "sort",
          page: "1",
          name: "name",
          sort: "ASC",
        };
        this.props.productLoadByCat(this.state.load);
        break;
      case "name_desc":
        this.state.load = {
          id: this.state.cat.id,
          action: "sort",
          page: "1",
          name: "name",
          sort: "DESC",
        };
        this.props.productLoadByCat(this.state.load);
        break;
      case "price_asc":
        this.state.load = {
          id: this.state.cat.id,
          action: "sort",
          page: "1",
          name: "price",
          sort: "ASC",
        };
        this.props.productLoadByCat(this.state.load);
        break;
      case "price_desc":
        this.state.load = {
          id: this.state.cat.id,
          action: "sort",
          page: "1",
          name: "price",
          sort: "DESC",
        };
        this.props.productLoadByCat(this.state.load);
        break;
      default:
        this.state.load = {
          id: this.state.cat.id,
          action: "sort",
          page: "1",
          name: "id",
          sort: "ASC",
        };
        this.props.productLoadByCat(this.state.load);
        break;
    }
  };
  render() {
    const totalPages = this.props.products.productsByCat.totalPages;
    const totalItems = this.props.products.productsByCat.totalItems;
    const currentPage = this.props.products.productsByCat.currentPage;
    const items = [];
    for (let i = 0; i < totalPages; i++) {
      items.push(
        <li className={i + 1 == currentPage ? "page-item active" : "page-item"}>
          <a className="page-link" onClick={() => this.onChangePage(i + 1)}>
            {i + 1}
          </a>
        </li>
      );
    }
    return (
      <div>
        <section className="product_area p_100">
          <div className="container">
            <div className="row product_inner_row">
              {totalItems > 0 ? (
                <div className="col-lg-9">
                  <div className="row m0 product_task_bar">
                    <div className="product_task_inner">
                      <div className="float-left">
                        <span>
                          Trang {currentPage} / {totalPages}| tổng {totalItems}{" "}
                          bánh
                        </span>
                      </div>
                      <div className="float-left">
                        <span>Loại bánh: {this.state.cat.name}</span>
                      </div>
                      <div className="float-right">
                        <h4>Sắp xếp:</h4>
                        <select
                          className="short"
                          id="sort"
                          onChange={() => this.sort()}
                        >
                          <option value="default">Mặc định</option>
                          <option value="name_asc">Tên bánh (tăng)</option>
                          <option value="name_desc">Tên bánh (giảm)</option>
                          <option value="price_asc">giá tiền (tăng)</option>
                          <option value="price_desc">giá tiền (giảm)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row product_item_inner">
                    {this.props.products.productsByCat.products.map((b) => (
                      <OneProduct b={b} />
                    ))}
                  </div>
                  <div className="product_pagination">
                    <div className="left_btn"></div>
                    <div className="middle_list">
                      <nav aria-label="Page navigation example">
                        <ul className="pagination">
                          {currentPage > 1 ? (
                            <li className="page-item">
                              <a
                                className="page-link"
                                onClick={() =>
                                  this.onChangePage(currentPage - 1)
                                }
                              >
                                «
                              </a>
                            </li>
                          ) : null}
                          {items}
                          {currentPage < totalPages ? (
                            <li className="page-item">
                              <a
                                className="page-link"
                                onClick={() =>
                                  this.onChangePage(currentPage + 1)
                                }
                              >
                                »
                              </a>
                            </li>
                          ) : null}
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="col-lg-9">
                  <center>
                    <h3>Không có sản phẩm</h3>
                  </center>
                </div>
              )}
              <div className="col-lg-3">
                <div className="product_left_sidebar">
                  <aside className="left_sidebar search_widget">
                    <div className="input-group">
                      <input
                        type="text"
                        name="keyword"
                        className="form-control"
                        placeholder="Nhập tên bánh cần tìm..."
                        onChange={(e) =>
                          (this.state.load = { keyword: e.target.value })
                        }
                        defaultValue={this.state.load.keyword}
                      />
                      <div className="input-group-append">
                        <button
                          className="btn"
                          type="button"
                          onClick={() => {
                            this.search(this.state.load.keyword);
                          }}
                        >
                          <i className="icon icon-Search" />
                        </button>
                      </div>
                    </div>
                  </aside>
                  <aside className="left_sidebar p_catgories_widget">
                    <div className="p_w_title">
                      <h3>Loại bánh</h3>
                    </div>
                    <ul className="list_style">
                      {this.props.categories.loaisanpham.map((cat) => (
                        <li>
                          <a
                            className="link"
                            onClick={() => this.onChangeCat(cat.id, 1)}
                          >
                            {cat.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </aside>
                  <aside className="left_sidebar p_price_widget">
                    <div className="p_w_title">
                      <h3>Tìm theo giá tiền</h3>
                    </div>
                    <div className="filter_price">
                      <div id="slider-range" />
                      <label htmlFor="amount">
                        phạm vi: <b>đơn vị (nghìn VNĐ)</b>
                      </label>
                      <br />
                      <input
                        className="float-left"
                        style={{ width: "100px" }}
                        type="number"
                        id="amount1"
                        value="0"
                        readOnly
                      />
                      <input
                        style={{ width: "100px" }}
                        className="float-left"
                        type="number"
                        id="amount2"
                        value="1500"
                        readOnly
                      />
                      <a
                        className="page-link"
                        onClick={() => {
                          this.findByPrice();
                        }}
                      >
                        Tìm
                      </a>
                    </div>
                  </aside>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  productLoadByCat(id, page, keyword) {
    productLoadByCat(dispatch, id, page, keyword);
  },
  loadCategories() {
    loadCategories(dispatch);
  },
});
const mapStateToProps = (state) => ({
  products: state.products,
  categories: state.categories,
});

export default connect(mapStateToProps, mapDispatchToProps)(index);
