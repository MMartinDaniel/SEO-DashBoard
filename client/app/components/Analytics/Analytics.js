import React, { Component } from 'react';
import 'whatwg-fetch';
import {Link} from 'react-router-dom'
import openSocket from "socket.io-client";
import {getFromStorage, setInStorage} from "../utils/storage";

class SiteMapGenerator extends Component{
  constructor(props){
    super(props);
    this.state = {
      loading:false,
      percentage: 0,
      alreadyGenerated: false,
      uid: '',
    };
    this.onSitemapClick = this.onSitemapClick.bind(this);
  }

  onSitemapClick(event){
    const obj = getFromStorage('static');
    this.setState({
        loading: true,
        uid: obj.uid,
    });

    fetch('/library/GenerateSitemap',{
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        web: obj.website,
        uid: obj.uid,
      })
    });
  }
  componentDidMount() {
  //  let data = {"token":"5cfe994350a07739181b9dae","website":"http://instantes.net","uid":"5cc709b00d38060c541de48b"};
   // setInStorage('static',data);

    const stat = getFromStorage('static');
    fetch('/library/Sitemap?uid=' + stat.uid,{
      method:'GET',
    }).then(res => res.json())
      .then(json => {
        console.log('json',json);
        if(json.success){
          this.setState({
            alreadyGenerated: json.exist,
            loading: false,
            uid: stat.uid,
          })
        }else{
          this.setState({
            alreadyGenerated: false,
            loading: false,
            uid: stat.uid,
          })
        }
      });
    this.socket = openSocket('http://localhost:80');
    this.socket.on('percentage-'+stat.uid, perce =>{
      this.setState({percentage:perce,loading:true});
      if( perce >= 100 ){this.setState({percentage:perce,loading:false,alreadyGenerated:true})};
    });

  }

  render() {
    let style = {
      bgfill:{
        background: '#2fbf33',
        width: this.state.percentage+'%',
        height: '130px',
        position: 'absolute',
      }
    };
    let {percentage,alreadyGenerated,loading,uid} = this.state;
    const {bgfill} = style;
    return (<>
      <div className="card-deck m-b-30">
        <div className={"card " +  (alreadyGenerated ? "greenS" : "redS")} onClick={ !alreadyGenerated && !loading ? this.onSitemapClick : null }  id="sitemap-widget" >
          <div  className="card-body" >Generate SiteMap
              <Link to={"library/sitemap/"+uid} target="_blank" >
                { alreadyGenerated && !loading ?  <i id="sitemap-download" className="fas fa-download"/> : "" }
              </Link>
          </div>
          <div style={bgfill}></div>
          <div className='subtext' >An XML sitemap lists a website’s important pages, making sure Google can find and crawl them all, and helping it understand your website structure</div>
           <div className='subtext-icon'  >
             { loading ?  <p>{percentage}%</p> :( alreadyGenerated ?  <i className="far fa-check-circle"/> : <i className="fas fa-ban"/> ) }

          </div>
        </div>
      </div>
      </>);
  }
};


class AnalysisTable extends Component{
  constructor(props){
    super(props);
    this.state = {users: []};

  }

  componentDidMount() {
    fetch('/api/signin')
      .then(res => res.json())
      .then(json => {
        this.setState({
          users: json
        });
      });
  }
  render(){
    return (
      <>
        <div className="card-deck m-b-30">
          <div className="card">
            <h5 className="card-header">Analysis Table</h5>
            <div className="card-body">
              <p>Using the most basic table markup, here’s how <code className="highlighter-rouge">.table</code>-based
                tables look in Bootstrap. <strong>All table styles are inherited in Bootstrap 4</strong>, meaning any
                nested tables will be styled in the same manner
                as the parent.</p>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                  <tr>
                    <th>Task</th>
                    <th>Status</th>
                    <th>Yearly Change</th>
                    <th>Net Change</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.users.map((user, i) => (
                    <tr key={i}>
                      <td>{user.email}</td>
                      <td>{user.password}</td>
                     </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </>
    );
  }
}


class Analytics extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div className='main-tab'>
          <div className="row">
            <div className='col-lg-7'>
              <AnalysisTable/>
            </div>
            <div className='col-lg-5'>
              <SiteMapGenerator/>
            </div>
          </div>
        </div>
      </>
    );
  }

}
const PRODUCTS = [
  {ColumnName: 'Task ', data: {}, status: true},
  {ColumnName: 'Status', data: {}, status: true },
  {ColumnName: 'Yearly Change', data: {}, status: false },
  {ColumnName: 'Net Change', data: {}, status: true}

];
export default Analytics;
