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
        <div className='SLL-alt'>{this.props.name}</div> <div className='SLL'>{this.props.details}</div>
      </div>
    </>);
  }

}
class SslCertContainer extends Component {

  constructor(props){
    super(props);
    this.state = {data:null,
      details:{
        title:'Heading Tags are used to define headings in a  page. h1 to h6 determines the importance that a heading has in the hierarchy.'
      }
    };
  }

  componentWillMount() {
    const obj = getFromStorage('static');
    this.setState({
      uid: obj.uid,
      website: obj.website,
    });
    console.log(obj.website + " and " + obj.uid);

    fetch('/task/cert',{
      method:'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(data => data.json()).then( data =>   this.setState({data: data.data}));
  }

  render(){
    const {data,details} = this.state;
    console.log(data);

    if(data){
      return(<>
        <h6 className={'chart-name spaced'}>{this.props.name}</h6>
        <div className='cert-container'>
          {
            (data.serialNumber !== null)
              ?
              <div>
                <SslCertReport name='SerialNumber' details={data.serialNumber}/>
                <SslCertReport name='CN' details={data.subject.CN}/>
                <SslCertReport name='Valid from ' details={data.valid_from}/>
                <SslCertReport name='Valid to ' details={data.valid_to}/>
              </div>
            :
              <div> Certificate not found on website  </div>

        }
        </div>
      </>);
    }else{
      return (<>
        <div className='seotest-container'/>

      </>);
    }
  }


}
export default SslCertContainer;
