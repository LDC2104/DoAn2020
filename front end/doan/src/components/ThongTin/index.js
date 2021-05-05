import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Logo from '../../images/logo.jpg';
import ReactPlayer from 'react-player'


class ThongTin extends Component{
  constructor(props) {
    super(props);
    this.state = {
      ds : [],
      isGV : false,
      ten : '',
      link : '',
    }
  }
  
  componentDidMount(){
    axios({
        method : 'GET',
        url : 'http://localhost:4000/users/TT',
        data : null,
        withCredentials: true
    }).then(res => {
      console.log(res.data);
      this.setState({
        ds: res.data[0].topic,
        isGV : res.data[0].isGV,
        ten : res.data[0].ten,
        link : res.data[0].topic[0].link,
      })
    })
  }

  onChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  upLink = (id, e) => {
    axios({
      method : 'put',
      url : 'http://localhost:4000/topics//link',
      data : {
        id : id,
        link : this.state.link
      },
      withCredentials: true
    }).then(res => {
      console.log(res.data);
      alert("Thành công");
    })
  }
  
  
  render() {
    return (

      <div>
            <div class="col-sm-12" style={{textAlign: 'center'}}>
                <img id="imgLogo" style={{maxHeight: '130px', width: '100%'}}  src={Logo} />
            </div>

            <div class="container-fluid padding">
                <div class="row padding">
                    <div class="col-md-3 col-sx-3 col-sm-3 col-lg-3">
                        <div class="accordion ">
                            <div class="accordion-group khungt">
                                <div class="accordion-heading" style={{padding: '5px'}}>
                                  <Link to='#'>Trang Chủ</Link>
                                </div>
                            </div>
                            <div class="accordion-group khungt">
                                <div class="accordion-heading stylecolor" style={{padding: '5px'}}>
                                        <a href="#">Tài liệu tham khảo</a>
                                </div>
                            </div>
                            <div class="accordion-group khungt">
                                <div class="accordion-heading stylecolor" style={{padding: '5px'}}>
                                    <p className="xc">Xin chào {this.state.ten}</p> 
                                    {/* {this.state.isGV ? 'giáo viên' : 'sinh viên'} */}
                                </div>
                            </div>
                            <div class="accordion-group khungt">
                                <div class="accordion-heading stylecolor" style={{padding: '5px'}}>
                                    <Link to='/'>Đăng xuất</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-sx-9 col-sm-9 col-md-9 col-lg-9">
                        <div class="divmain">
                            <div class="bgtitle">Thông tin</div>
                            {this.state.ds.map((item, index) => {
                              return <div className="panel panel-danger"style={{marginTop:'10px'}} key={index}>
                                        <div className="panel-body" >
                                            <h4>- Tên đồ án: {this.state.ds[index].tenDoAn}</h4>
                                            <h4>- Nền tảng: {this.state.ds[index].nenTang} </h4>
                                            <h4>- Mô tả: {this.state.ds[index].moTa} </h4>
                                            <h4>- Ngày báo cáo: {this.state.ds[index].ngayNop === 'Invalid date' ? 'Chưa cập nhật' : this.state.ds[index].ngayNop} </h4>
                                            <h4>- Phòng: {this.state.ds[index].phong === null ? 'Chưa cập nhật' : this.state.ds[index].phong} </h4>
                                            <h4>- Thành viên: 
                                              {this.state.ds[index].user.map((item) => {
                                                if(item.isGV === false){
                                                return  <p className="ml-10 mt-5" key={item.id}>Tên: {item.ten}, Email: {item.email}</p>
                                                }
                                              })}
                                            </h4>
                                            <h4>- Giảng viên hướng dẫn: 
                                              {this.state.ds[index].user.map((item) => {
                                                if(item.isGV === true && item.User_Topic.important === 1){
                                                return  <p className="ml-10 mt-5" key={item.id}>Tên: {item.ten}, Email: {item.email}</p>
                                                }
                                              })}
                                            </h4>
                                            <h4>- Giảng viên phản biện: 
                                              {this.state.ds[index].user.map((item) => {
                                                if(item.isGV === true && item.User_Topic.important === 0){
                                                return  <p className="ml-10 mt-5" key={item.id}>Tên: {item.ten}, Email: {item.email}</p>
                                                }
                                              })}
                                            </h4>

                                          <table class="table table-striped">
                                            <thead>
                                              <tr>
                                                <th>Giảng viên</th>
                                                <th>Lần 1</th>
                                                <th>Lần 2</th>
                                                <th>Lần 3</th>
                                                <th>Điểm tổng</th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              {
                                                this.state.ds[index].user.map((item, index) => {
                                                  if (item.isGV === true && item.User_Topic.important === 1) {
                                                    return <tr>
                                                            <td>{item.ten}</td>
                                                            <td>
                                                              {this.state.ds[index].lan1 === null ?
                                                              'Chưa cập nhật'
                                                              : this.state.ds[index].lan1}
                                                            </td>
                                                            <td>
                                                              {this.state.ds[index].lan2 === null ?
                                                              'Chưa cập nhật'
                                                              : this.state.ds[index].lan2}
                                                            </td>
                                                            <td>
                                                              {this.state.ds[index].lan3 === null ?
                                                              'Chưa cập nhật'
                                                              : this.state.ds[index].lan3}
                                                            </td>
                                                            <td>...</td>
                                                          </tr>
                                                  }
                                                })
                                              }
                                              {
                                                this.state.ds[0].user.map((item) => {
                                                  if (item.isGV === true && item.User_Topic.important === 0) {
                                                    return <tr>
                                                            <td>{item.ten}</td>
                                                            <td>
                                                              {this.state.ds[0].lan4 === null ?
                                                              'Chưa cập nhật'
                                                              : this.state.ds[0].lan4}
                                                            </td>
                                                            <td>
                                                              {this.state.ds[0].lan5 === null ?
                                                              'Chưa cập nhật'
                                                              : this.state.ds[0].lan5}
                                                            </td>
                                                            <td>
                                                              {this.state.ds[0].lan6 === null ?
                                                              'Chưa cập nhật'
                                                              : this.state.ds[0].lan6}
                                                            </td>
                                                            <td>...</td>
                                                          </tr>
                                                  }
                                                })
                                              }
                                            </tbody>
                                          </table>

                                          <h4>
                                            -Link video
                                            <div>
                                              <input style={{marginLeft: '15px', width: '400px'}} name="link" type="text" value={this.state.link} onChange={this.onChange} />
                                              <button className="ml-10 btn-info " onClick={() => this.upLink(this.state.ds[index].id)}>UpLink</button>
                                            </div>
                                            {
                                              this.state.link !== ''
                                              ? <ReactPlayer
                                                    style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '300px', height: '200px', marginTop: '20px'}}
                                                    url={this.state.link}
                                                    controls
                                                />
                                              : ''
                                            }
                                            
                                          </h4>

                                        </div>
                              </div>    
                        })
                      }                            
                        </div>
                    </div>
                </div>

                <div class="container-fluid padding">	
                    <div class="row text-center padding">
                        <div class="col-12">
                            <h2>Contact us</h2>
                        </div>
                        <div className="col-12 social padding">
                            <a href="#"><i className="fab fa-facebook" /></a>
                            <a href="#"><i className="fab fa-twitter" /></a>
                            <a href="#"><i className="fab fa-google-plus-g" /></a>
                            <a href="#"><i className="fab fa-instagram" /></a>
                            <a href="#"><i className="fab fa-youtube" /></a>
                        </div>
                    </div>
                </div>	
                <footer>
                    
                </footer>
            </div>
        </div>
    );
  }
  
}

export default ThongTin;