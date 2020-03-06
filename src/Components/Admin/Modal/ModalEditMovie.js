import React, {useState, useEffect, useCallback,useReducer} from 'react'
import moment from "moment";
import * as action from "../../../Store/action";
import { connect } from "react-redux";
function ModalEditMovie(props) {
    const [recevieMovie, setrecevieMovie]=useState([])
    const [movie,setMovie]= useState({maPhim:"",tenPhim:"",biDanh:"",trailer:"",ngayKhoiChieu:"",hinhAnh:"",danhGia:""})
    const [maPhim, setmaPhim] = useState("");
    useEffect(() => {
       setmaPhim(props.idphim)
       if(props.idPhim!==""){
          return props.detaiMovie(props.idPhim)
       }
    }, [props.idPhim])
    useEffect(() => {
        console.log(movie)
        setrecevieMovie(props.movie)
        setmaPhim (movie.maPhim)
    })      
      const handleChangeEdit = useCallback(event => {
        const { name, value } = event.target;
        setMovie({ ...recevieMovie, [name]: value });
      });
    // const handleChangeEdit = useCallback(
    //     () => {
    //       console.log('Click happened');
    //     },
    //     [], // Tells React to memoize regardless of arguments.
    //   );
    //   const handleChangeEdit =(event)=>{
    //     let target = e.target;
    //     let name = target.name;
    //     let value = target.value;
        

    //   }
        // let target = e.target;
        // let name = target.name;
        // let value = await target.value;
        // this.setState(
        //   {
        //     [name]: value,
        //     sumbitDataMovie: {
        //       maPhim: this.state.maPhim,
        //       tenPhim: this.state.tenPhim,
        //       biDanh: this.state.biDanh,
        //       hinhAnh: this.state.hinhAnh,
        //       trailer: this.state.trailer,
        //       maNhom: "GP01",
        //       ngayKhoiChieu: this.state.ngayKhoiChieu,
        //       danhGia: this.state.danhGia,
        //       moTa: this.state.moTa,
        //       [name]: value
        //     }
        //   },
        //   () => {
        //     console.log(this.state);
        //   }
        // );
    return (
        <div id="myModal" className="modal fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content editMovie">
            <div className="modal-body">
              <form
                // onSubmit={this.handleSubmitEdit}
                encType="multipart/form-data"
                action="/upload/image"
              >
                <div className="form-group">
                  <label>Mã Phim:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="maPhim"
                    defaultValue={recevieMovie.maPhim ? recevieMovie.maPhim : "Loading"}
                    onChange={handleChangeEdit}
                    placeholder="Nhập Mã Phim"
                  />
                </div>
                <div className="form-group">
                  <label>Tên Phim:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="tenPhim"
                    onChange={handleChangeEdit}
                    defaultValue={recevieMovie.tenPhim}
                    placeholder="Nhập Tên Phim"
                  />
                </div>
                <div className="form-group">
                  <label>Bí Danh:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="biDanh"
                    autoComplete="password"
                    // value={this.state.biDanh!=="" ? this.state.biDanh :"loading"}
                    // onChange={this.handleChangeEdit}
                    placeholder="Nhập Bí Danh Phim"
                  />
                </div>
                <div className="form-group">
                  <label>Trailer:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="trailer"
                    // value={
                    //   this.state.trailer!=="" ? this.state.trailer : "loading"
                    // }
                    // onChange={this.handleChangeEdit}
                    placeholder="Nhập đường dẫn trailer Youtube"
                  />
                </div>
                <div className="form-group">
                  <label>Ngày Khởi Chiếu:</label>
                  <input
                    type="date"
                    className="datePicker"
                    // onChange={this.handleChangeEdit}
                    // value={
                    //   this.state.ngayKhoiChieu
                    //     ? moment
                    //         .utc(this.state.ngayKhoiChieu)
                    //         .format("YYYY-MM-DD")
                    //     : "Loading"
                    // }
                    name="ngayKhoiChieu"
                    id="ngayKhơiChieu"
                  />
                </div>
                <div className="form-group">
                  <label>Hình Ảnh:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="hinhAnh"
                    // value={
                    //   this.state.hinhAnh!=="" ? this.state.hinhAnh : "loading"
                    // }
                    // onChange={this.handleChangeEdit}
                    placeholder="Chỉ được nhập link ảnh từ nguồn Khác"
                  />
                </div>
                <div className="form-group">
                  <label>Đánh Giá:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="danhGia"
                    // value={
                    //   this.state.danhGia!=="" ? this.state.danhGia : "loading"
                    // }
                    // onChange={this.handleChangeEdit}
                    placeholder="Nhập đánh giá từ 1 đến 5"
                  />
                </div>
                <button type="submit" className="btn btn-update btn-success">
              Submit
                </button>
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                >
                 Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
}
const mapStateToProps = state => {
    return {
        movie: state.movieReducer.movie,
    };
  };
const mapDispatchToProps = dispatch => {
  return {
    updateMovie: tk => {
      dispatch(action.actUpdateMovie(tk));
    },
    addImageMovie: image => {
      dispatch(action.actthemHinhAnhPhim(image));
    },
    detaiMovie :id=>{
        dispatch(action.actGetDetailMovieAPI(id))
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalEditMovie)