import React, {Component} from 'react';
import openSocket from 'socket.io-client';
import  ReactTable from 'react-table';
import {Link} from "react-router-dom";
import {getFromStorage} from "../utils/storage";
import isAbsoluteUrl from 'is-absolute-url'

class ReportImageAlt extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render(){
    console.log(this.props);
    
    function validURL(str) {
      var pattern = new RegExp('^(https?:\\/\\/)?'+'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ '((\\d{1,3}\\.){3}\\d{1,3}))'+'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ '(\\?[;&a-z\\d%_.~+=-]*)?'+'(\\#[-a-z\\d_]*)?$','i'); 
      return !!pattern.test(str);
    }
    const {url} = this.props;
    return(<>
      <div className='alt-report-grid'>
              <table>
                <thead>
                  <tr>
                    <th>Thumbnail</th>
                    <th>Alt text</th>
                    <th>Url</th>
                  </tr>
                </thead>
                <tbody>
                {
                  this.props.details.map(function (item, i) {
                    let pic_url = isAbsoluteUrl(item.url) ? item.url : `http://${url}${item.url}`;

                   return <tr className="matoi-item" key={i}>
                      <td className={(item.alt !== undefined) ? 'alt-report yes-alt' : 'alt-report no-alt'} ><img src={pic_url}/></td>
                      <td className='alt-name'>{item.alt}</td>
                      <td className='url-name'><a target="_blank" href={pic_url}>
                        <div className="alt-button">Inspect Image</div>
                      </a></td>
                    </tr>;

                  })
                }
                </tbody>
              </table>

      </div>
    </>);
  }

}

class AlternativeTool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      uid: '',
      loading: false,
      percentage: '0',
      data: {imgAlt:{}},
      url:'',
      info_data: {}
    };

    this.checkAlternative = this.checkAlternative.bind(this);
    this.changeURL = this.changeURL.bind(this);

  }

  componentDidMount() {
    const obj = getFromStorage('static');
    this.setState({
      uid: obj.uid,
      loading: false,
    });
  }

  changeURL(){
    this.setState({url:event.target.value});
}


componentWillMount() {
 
}
  checkAlternative(event){
     event.preventDefault();

      function validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ '((\\d{1,3}\\.){3}\\d{1,3}))'+'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ '(\\?[;&a-z\\d%_.~+=-]*)?'+'(\\#[-a-z\\d_]*)?$','i'); 
        return !!pattern.test(str);
      }

      if(!validURL(this.state.url)){
        console.log("is not valid");
        return;
      }

      let pattern = /^((http|https|ftp):\/\/)/;
      let url = "";
      if(!pattern.test(this.state.url)) {
        url = "http://" + this.state.url;
      }else{
        url = this.state.url;
      }
    
    this.setState({
      loading: true,
      percentage: '0',
      data: {imgAlt:{}},
      info_data: {}
    });
    let parsed_data = [];


    console.log('fetching for:'+ '/task/imgNoAlt?url='+url);
    fetch('/task/imgNoAlt?url='+url,{
      method:'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(data => data.json()).then( data =>   this.setState({data: data.data,loading:false}));

  }

  render(){
    const { messages , loading,data,info_data,url} = this.state;
    console.log(data);
    return (<>
      <div className='main-tab'>
      <div className="row">
        <div className='col-lg-8'>
          <div className="card-deck m-b-30">
            <div className="card" >

              <div className="loading-card">
              { loading
                        ?   <form onSubmit={this.formPreventDefault}><input type="text" onChange={this.changeURL} value={this.state.url} placeholder="Insert URL"></input><input type="submit"onClick={this.checkAlternative}  value={"         "} disabled></input> </form>
                        :   <form onSubmit={this.formPreventDefault}><input type="text" value={this.state.url} onChange={this.changeURL} placeholder="Insert URL"></input><input type="submit"onClick={this.checkAlternative}  value="Generate"></input> </form>
                      }

                <div className={loading ? 'spinner-border float-right text-secondary spinner-white spinner-activated' : ' spinner-border float-right text-secondary  spinner-white spinner-deactivated' } id="spinner" role="status">
                  <span className="sr-only"></span>
                </div>
              </div>
              <h5 className="card-header">Missing Alternative Tool</h5>
              <div className="card-body">
                {
                  ( data.imgAlt !== null && (data.imgAlt.length > 0) ) ? 
                  <ReportImageAlt name={"Images with no alternative"} url={url} details={data.imgAlt}  />
                  : null
                }
                  </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>);

  }
}

//  <a href={'/api/minifier?url=http://dnmartin.net/css/style.css'}></a>
export default AlternativeTool;
