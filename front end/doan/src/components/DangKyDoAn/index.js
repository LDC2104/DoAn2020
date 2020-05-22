import React, { Component } from 'react';
//import cookie from 'react-cookies';
import DanhSachDoAn from '../DanhSachDoAn';
import axios from 'axios';


class DangKyDoAn extends Component{
    constructor(props){
        super(props);
        this.state =  {
          danhsach : []
        }
    }
    componentDidMount(){
        axios({
            method : 'GET',
            url : 'http://localhost:4000/topics',
            data : null
        }).then(res => {
          this.setState({
            danhsach : res.data,
          })
        })
      }

      onClick = (id, ds, sln) => {
        let sl = 0;
        ds.map((item) => {
          if(item.isGV === false)
            return sl = sl + 1;
        })
        if (sl < 3) {
          const {history} = this.props;
          axios({
            method : 'POST',
            url : 'http://localhost:4000/topics/dkda',
            data : {id : id},
            withCredentials: true
          }).then(res => {
            console.log(res.data);
            history.push('/ThongTin');
          })
        }
        else alert('Số lượng sinh viên đăng ký đã đủ, xin chọn đồ án khác');
        
      }

  render() {
      let {danhsach} = this.state;
    return (
      <div>
        <div className="panel panel-danger">
              <div className="panel-heading mc">
                    <h3 className="panel-title">Danh sách đồ án</h3>
              </div>
              <div className="panel-body">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên đồ án</th>
                                <th>Nền tảng</th>
                                <th>Mô tả</th>
                                <th>Ngày nộp</th>
                                <th>Số lượng</th>
                                <th>Người đăng ký</th>
                                <th>Giáo viên hướng dẫn</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.showDanhSach(danhsach)}
                        </tbody>
                    </table>
              </div>
        </div>
      </div>
    );
  }

  showDanhSach(danhsach){
    let resuft = null;
    if(danhsach.length > 0){
        resuft = danhsach.map((ds, index) =>{
            return(
                <DanhSachDoAn
                  key={index}
                  ds={ds}
                  index={index}
                  onClick={this.onClick}
                />
            );
        });
    }
    return resuft;
}
  
}

export default DangKyDoAn;