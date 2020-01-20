import React from 'react'

export default function footer() {
    return (
       <div classname="footer">
  <div classname="footer-content">
  <div className="row">
    <div classname="col-sm-4 col-xs-12">
      <p classname="footer-title">
        MOVIE THEATER
      </p>
      <div classname="col-sm-6 col-xs-6 noPaddingLeft">
        <a ui-sref="main.faq" href="https://tix.vn/faq">FAQ</a>
      </div>
      <a ui-sref="guildline.guidev2" href="https://tix.vn/brand-guideline/">Brand Guidelines</a>
    </div>
    <div className="col-sm-6 col-xs-12 noPaddingLeft fontSizeP ng-scope">
      <a ui-sref="main.term" href="https://tix.vn/thoa-thuan-su-dung">Thỏa thuận sử dụng</a>
      <a ui-sref="main.regular" href="https://tix.vn/quy-che-hoat-dong">Quy chế hoạt động</a>
      <a ui-sref="main.policy" href="https://tix.vn/chinh-sach-bao-mat">Chính sách bảo mật</a>
      <a ui-sref="main.guidev2" href="https://tix.vn/quyen-loi-thanh-vien/">Quyền lợi thành viên</a>
    </div>
    </div>
    </div>  
    </div>
  )

}
