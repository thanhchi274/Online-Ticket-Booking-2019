import React, { Component } from "react";

export default class BookingMobile extends Component {
  render() {
    return (
      <div>
        <div className="booking-ticket col-sm-4 desktop">
          <div className="container">
            <div className="img-movie-booking">
              <img
                src={room.thongTinPhim ? room.thongTinPhim.hinhAnh : ""}
              ></img>
            </div>
            <div className="total">
              <h4>
                TOTAL:<span> {this.state.tienVe}Đ</span>
              </h4>
            </div>
            <div className="seat-check">
              <h5>
                GHẾ ĐÃ CHỌN: {""}
                <span>{this.renderTicket()}</span>
              </h5>
            </div>
            <div className="checkType">
              <h5>Hình thức thanh toán</h5>
              {this.state.danhSachVe.length !== 0 ? (
                <form className="container" onChange={this.setPay.bind(this)}>
                  <div className="payStyle_container">
                    <div className="row align-items-center payStyle">
                      <input
                        type="radio"
                        name="pay"
                        value="zalopay"
                        defaultChecked
                      />
                      <img src="https://lh3.googleusercontent.com/F8cUV5oOLjCTMSvSRymK1154MwKalnvkepN4xGrfWBC_tcXvNTq_sEStiwCYV61lRdI=s180-rw"></img>
                      <p>Thanh toán qua Zalo PAY</p>
                    </div>
                    {this.state.payStyle === "zalopay" ? (
                      <div className=" payStyle_pay">
                        {" "}
                        <img
                          alt="ZaloPay"
                          src="https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.15752-9/86977583_2651059108511383_5143827256606457856_n.jpg?_nc_cat=107&_nc_ohc=ogOA-E8yXMkAX9UhCFk&_nc_ht=scontent.fsgn3-1.fna&oh=4b7dc1aa1e1dc90e2fb2e48d56116c92&oe=5EF560CC"
                        />
                        <p>Vui lòng quét mã ZaloPay để hoàn tất thanh toán</p>
                      </div>
                    ) : null}
                  </div>
                  <div className="payStyle_container">
                    <div className="row align-items-center payStyle">
                      <input type="radio" name="pay" value="momo" />
                      <img
                        className="paymentMethod--img"
                        src="https://lh3.googleusercontent.com/MrBpQdI1sB8c2LUomM6wQfpIx3yuV2usmHY-rVM6J5jiQ_VXEm81vuv7sHPfi78SwQM=s180-rw"
                        srcSet="https://lh3.googleusercontent.com/MrBpQdI1sB8c2LUomM6wQfpIx3yuV2usmHY-rVM6J5jiQ_VXEm81vuv7sHPfi78SwQM=s360-rw 2x"
                        aria-hidden="true"
                        alt="Ảnh bìa"
                        itemProp="image"
                        data-atf="false"
                        data-iml="37830.04499999515"
                      ></img>
                      <p>Thanh toán bằng ví điện tử MOMO</p>
                    </div>
                    {this.state.payStyle === "momo" ? (
                      <div className=" payStyle_pay">
                        {" "}
                        <img
                          alt="Momo"
                          src="https://scontent-hkg3-2.xx.fbcdn.net/v/t1.15752-9/86969607_2592060907738901_7392232684623233024_n.jpg?_nc_cat=111&_nc_ohc=rXRWI-3efysAX9x72Jn&_nc_ht=scontent-hkg3-2.xx&oh=2514b0089c43a46c313103dab319d42c&oe=5EC2AC9A"
                        />
                        <p>Vui lòng quét mã MOMO để hoàn tất thanh toán</p>
                      </div>
                    ) : null}
                  </div>
                  <div className="payStyle_container">
                    <div className="row align-items-center payStyle">
                      <input type="radio" name="pay" value="card" />
                      <img
                        className="paymentMethod--img"
                        src="https://anh4.com/images/2020/02/02/OfruP.png"
                        alt="OfruP.png"
                        border={0}
                      />
                      <p>Thanh toán qua thẻ VISA/MASTERCARD</p>
                    </div>
                    {this.state.payStyle === "card" ? (
                      <div className=" payStyle_pay">
                        {" "}
                        <p>
                          Xin lỗi hiện tại chúng tôi chưa hỗ trợ hình thức thanh
                          toán này, vui lòng chọn phuong thức thanh toán khác
                        </p>
                      </div>
                    ) : null}
                  </div>
                </form>
              ) : null}
            </div>
            <div className="btnAction_container">
              <button
                type="button"
                className="btnBook"
                data-toggle="modal"
                data-target="#exampleModal"
                onClick={this.handleSubmit}
              >
                Đặt vé
              </button>
              {this.renderError()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
