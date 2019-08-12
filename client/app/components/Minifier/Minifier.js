import React, {Component} from 'react';
import openSocket from 'socket.io-client';
import  ReactTable from 'react-table';
import {Link} from "react-router-dom";
import {getFromStorage} from "../utils/storage";

class Minifier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      uid: '',
      loading: false,
      percentage: '0',
      data: {},
      url:'',
      info_data: {}
    };

    this.checkMinify = this.checkMinify.bind(this);
    this.changeURL = this.changeURL.bind(this);

  }

  getResources(){

    fetch('/api/minifier/minified',{
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: this.state.data,
      })
    }).then(response => response.json()).then(data=>{
      this.setState({info_data:data,loading:false});
    });
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
  checkMinify(event){
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
      data: {},
      info_data: {}
    });
    let parsed_data = [];

    fetch('https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url='+url+'&category=performance').then(response => response.json())
      .then(data => {

        data.lighthouseResult.audits['network-requests'].details.items.forEach( item =>{
          if(item.resourceType === "Stylesheet" || item.resourceType === 'Script'){
            let filename = item.url.substring(item.url.lastIndexOf('/')+1);
            parsed_data.push({deadlink:item,status:false,where:item.url,name:filename});
          }
        });
        //this.setState({data:data.lighthouseResult.audits['network-requests'].details.items});
        this.setState({data:parsed_data});

        console.log(this.state.data);
        this.getResources();

      });
  }

  render(){
    const { messages , loading,percentage,data,info_data} = this.state;
    console.log(data);
    console.log(info_data);
    console.log(this.state.url);
    return (<>
      <div className='main-tab'>
      <div className="row">
        <div className='col-lg-8'>
          <div className="card-deck m-b-30">
            <div className="card" >

              <div className="loading-card">
              { loading
                        ?   <form onSubmit={this.formPreventDefault}><input type="text" onChange={this.changeURL} value={this.state.url} placeholder="Insert URL"></input><input type="submit"onClick={this.checkMinify}  value={"         "} disabled></input> </form>
                        :   <form onSubmit={this.formPreventDefault}><input type="text" value={this.state.url} onChange={this.changeURL} placeholder="Insert URL"></input><input type="submit"onClick={this.checkMinify}  value="Generate"></input> </form>
                      }

                <div className={loading ? 'spinner-border float-right text-secondary spinner-white spinner-activated' : ' spinner-border float-right text-secondary  spinner-white spinner-deactivated' } id="spinner" role="status">
                  <span className="sr-only"></span>
                </div>
              </div>
              <h5 className="card-header">Resources Minification tool</h5>
              <div className="card-body">

                    <table className='minifier-table'>
                      <thead>
                      <tr>
                        <th>Type</th>
                        <th>Resource</th>
                        <th>Size</th>
                        <th>Minified Size</th>
                        <th>% Saved</th>
                        <th>Minify</th>
                      </tr>
                      </thead>
                      <tbody>
                      {(data.length >= 0 && info_data.length >= 0)?

                       data.map(function(item, i){
                         let icon = null;
                         let type = 0;
                         if(item.deadlink.resourceType === 'Stylesheet'){
                           icon = "icons8-css3-48.png"
                           type =2;
                         }else if(item.deadlink.resourceType === 'Script' ){
                           icon = "icons8-javascript-48.png";
                           type=1;
                         }
                         return <tr  key={i} >
                           <td><img src={'/assets/img/icon/' + icon }/></td>
                           <td className='minify-name'>{item.name}</td>

                           <td>{item.deadlink.resourceSize}</td>
                           <td>{info_data[i].minifiedSize}</td>
                           <td><div className="minified yesm">{Math.abs(Math.floor((info_data[i].efficiency)*100))}%</div></td>

                           <td><a  href={"/api/minifier/minify?url="+ item.where+"?type="+type }><div className="minify-button">Minify</div></a></td>
                         </tr>;
                        })

                        : null
                      }

                      </tbody>
                  </table>

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
export default Minifier;
