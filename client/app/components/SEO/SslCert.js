import React, { Component } from 'react';
import 'whatwg-fetch';
import {getFromStorage} from "../utils/storage";

class SslCertReport extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render(){
    console.log(this.props);
    return(<>
      <div className='cert-report-grid'>
        <div className='SLL-alt'>{this.props.name}</div> <div className='SLL'>{(this.props.details > 0) ? this.props.details : 'No SSL in this website'}</div>
      </div>
    </>);
  }

}
class SslCertContainer extends Component {
  constructor(props){
    super(props);
    const obj = getFromStorage('static');

    this.state = {
      data:null,
      uid: obj.uid,
      website: obj.website,
      details:{
        title:'Heading Tags are used to define headings in a  page. h1 to h6 determines the importance that a heading has in the hierarchy.'
      }
    };
  }

  componentWillMount() {
    fetch('/task/cert?url='+this.state.website,{
      method:'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(data => data.json()).then( data => this.setState({data: data.data}));
  }

  render(){
    const {data,details} = this.state;
    console.log("cert:");
    console.log(data);
    if(data && data.length > 0){
      return(<>
        <h6 className={'chart-name spaced'}>{this.props.name}</h6>
        <div className='cert-container'>
          {
          
              <div className="cert-grid">
                <SslCertReport name='SerialNumber' details={(data.serialNumber !== null) ? data.serialNumber : ""}/>
                <SslCertReport name='CN'          details={(data.subject.CN !== null) ? data.subject.CN : ""    }/>
                <SslCertReport name='Valid from ' details={(data.valid_from !== null) ? data.valid_from : ""    }/>
                <SslCertReport name='Valid to '   details={(data.valid_to !== null) ? data.valid_to : ""        }/>
              </div>
             
        }
        </div>
      </>);
    }else{
      return(<></>);
    }

  }


}
export default SslCertContainer;
