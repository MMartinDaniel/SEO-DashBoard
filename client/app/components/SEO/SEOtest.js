import React, { Component } from 'react';
import 'whatwg-fetch';
import {getFromStorage} from "../utils/storage";
import openSocket from "socket.io-client";
import SEO from "./SEO";

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render(){
    return(<>
      <div className='test-report'>
        <div className='report-name'>
          <label><i className="fas fa-check"/></label><strong> {this.props.name} Tag </strong>
          <ul className='report-importance'>
            <li className='full'/><li className='full'/>
            <li className='full'/><li className='full'/>
            <li className=''/>
          </ul>
        </div>
        <div className='report-info'>
          <p>{this.props.details}</p>
        </div>
      </div>
    </>);
  }

}

class HContainer extends Component {

  constructor(props){
    super(props);
    this.state = {data:null,
      details:{
      h: Tags[0].h.info,
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

    fetch('/task/h',{
      method:'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(data => data.json()).then( data =>   this.setState({data: data.data}));
  }

  render(){
    const {data,details} = this.state;
    if(data){
      return(<>
        <h6 className={'chart-name spaced'}>{this.props.name}</h6>
        <div className='seotest-container'>
          <Report name={"H1"} value={data.h1} details={details.h} />
          <Report name={"H2"} value={data.h2} details={details.h} />
          <Report name={"H3"} value={data.h3} details={details.h} />
        </div>
      </>);
    }else{
      return (<>
        <div className='seotest-container'/>
      </>);
    }
  }


}


class SEOtest extends Component {
  constructor(props) {
    super(props);
    this.state = {data: null};
  }

  render(){

      return(<>
        <div className='seotest-container'>
          <HContainer name='H Tags'/>
        </div>
      </>
      );
  }

}
export default SEOtest;

const Tags =[
  {
    h: {h1: '', h2: 'fas fa-home', h3: '',h4:'',info:'Heading Tags are used to define headings in a  page. h1 to h6 determines the importance that a heading has in the hierarchy.'},
  },
];
